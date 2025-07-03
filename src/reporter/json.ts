import {
    EXEC_STATUS, ExecStatus, STRUCTURED_LOGS_ENVVAR_NAME, shortenFilePath,
} from '@testla/screenplay';
import type {
    FullResult,
    Reporter, TestCase, TestStep,
} from '@playwright/test/reporter';
import { rm, appendFileSync, existsSync } from 'fs';
import { Readable } from 'stream';
import { FilterEventStream } from '../streams/FilterEvent';
import { ParseEventStream } from '../streams/ParseEvent';
import { streamToTestExecutionDetails } from '../utils/stream';
import { TestExecution, TestExecutionStep } from '../types';

class JsonReporter implements Reporter {
    protected outputFile: string;

    protected executions: Map<string, TestExecution> = new Map();

    constructor(config: any) {
        this.outputFile = `${config.configDir}/${config.outputFile || 'screenplay-report.json'}`;
    }

    private static getTitlePath(test: TestCase): string[] {
        const paths = test.titlePath();
        return paths.filter((entry: string) => entry !== '').slice(2);
    }

    protected write(msg?: string) {
        if (msg !== undefined && this.outputFile) {
            appendFileSync(this.outputFile, `${msg}\n`);
        }
    }

    protected static isPwStepInStep(pwStep: TestStep, step: TestExecutionStep): boolean {
        const stepStartTime = new Date(step.startTime);
        return pwStep.startTime.getTime() >= stepStartTime.getTime()
            && (pwStep.startTime.getTime() + pwStep.duration) <= (stepStartTime.getTime() + (step.duration || 0));
    }

    onBegin() {
        if (this.outputFile && existsSync(this.outputFile)) {
            rm(this.outputFile, (err) => {
                if (err) {
                    throw (err);
                }
            });
        }

        process.env[STRUCTURED_LOGS_ENVVAR_NAME] = 'true';
    }

    protected static connectToRightStep(pwStep: TestStep, steps: TestExecutionStep[] = []): void {
        // find the right parent step
        // we need to find the last possible step to lower the risk for
        // placing 0ms playwright steps to the wrong internal step
        const stepToConnectTo = steps.findLast((step: TestExecutionStep) => JsonReporter.isPwStepInStep(pwStep, step));
        if (stepToConnectTo) {
            if (!stepToConnectTo.steps || stepToConnectTo.steps[0].isPW) {
                if (!stepToConnectTo.steps) {
                    stepToConnectTo.steps = [];
                }
                const pwStepToAdd: TestExecutionStep = {
                    isPW: true,
                    duration: pwStep.duration,
                    error: pwStep.error,
                    location: pwStep.location ? {
                        ...pwStep.location,
                        file: shortenFilePath(pwStep.location?.file),
                    } : undefined,
                    startTime: pwStep.startTime,
                    steps: [], // currently no PW substeps supported
                    title: pwStep.title,
                    status: !pwStep.error ? EXEC_STATUS.PASSED : EXEC_STATUS.FAILED,
                };
                stepToConnectTo.steps.push(pwStepToAdd);
            } else {
                JsonReporter.connectToRightStep(pwStep, stepToConnectTo.steps);
            }
        }
    }

    async onTestEnd(test: TestCase) {
        const stepsPerRun = await Promise.all(test.results.map(async (run) => streamToTestExecutionDetails(
            Readable.from(run.stdout)
                .pipe(new FilterEventStream())
                .pipe(new ParseEventStream()),
        )));
        // enrich stepsPerRun with pw steps
        test.results.forEach((run, runIdx) => {
            run.steps.forEach((pwStep: TestStep) => {
                if (pwStep.category !== 'hook') {
                    JsonReporter.connectToRightStep(pwStep, stepsPerRun[runIdx]);
                }
            });
        });
        const newExecution: TestExecution = {
            testCaseId: test.id,
            titlePath: JsonReporter.getTitlePath(test),
            project: test.parent.parent?.parent?.title || '',
            suite: test.parent.parent?.title || '',
            location: {
                ...test.location,
                file: shortenFilePath(test.location.file),
            },
            runs: test.results.map((run, idx) => ({
                status: run.status.toString() as ExecStatus,
                startTime: run.startTime,
                duration: run.duration,
                steps: stepsPerRun[idx],
            })),
        };
        this.executions.set(test.id, newExecution);
    }

    onEnd(result: FullResult): void {
        const report = {
            ...result,
            executions: Array.from(this.executions.values()),
        };
        this.write(JSON.stringify(report, null, 2));
    }

    static printsToStdio(): boolean {
        return false;
    }
}
export default JsonReporter;
