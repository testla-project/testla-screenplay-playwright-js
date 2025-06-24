import { ExecStatus, STRUCTURED_LOGS_ENVVAR_NAME, shortenFilePath } from '@testla/screenplay';
import type {
    FullResult,
    Reporter, TestCase, TestStep,
} from '@playwright/test/reporter';
import { rm, appendFileSync, existsSync } from 'fs';
import { Readable } from 'stream';
import { FilterEventStream } from '../streams/FilterEvent';
import { ParseEventStream } from '../streams/ParseEvent';
import { streamToTestExecutionDetails } from '../utils/stream';
import { PwStepInTestExecution, TestExecution, TestExecutionStep } from '../types';

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

    protected write(msg: string) {
        if (this.outputFile) {
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

    protected static connectToRightStep(pwStep: TestStep, steps: TestExecutionStep[]): void {
        // find the right parent step
        const stepToConnectTo = steps?.findLast((step) => JsonReporter.isPwStepInStep(pwStep, step));
        // eslint-disable-next-line
        // @ts-ignore
        if (stepToConnectTo) {
            if (!stepToConnectTo.steps || stepToConnectTo.steps[0].category !== undefined) {
                // eslint-disable-next-line
                // @ts-ignore
                if (!stepToConnectTo.steps) {
                    // eslint-disable-next-line
                    // @ts-ignore
                    stepToConnectTo.steps = [];
                }
                const pwStepToAdd: PwStepInTestExecution = {
                    category: pwStep.category,
                    duration: pwStep.duration,
                    error: pwStep.error,
                    // location: pwStep.location,
                    location: pwStep.location ? {
                        ...pwStep.location,
                        file: shortenFilePath(pwStep.location?.file),
                    } : undefined,
                    startTime: pwStep.startTime,
                    // steps: Array<TestStep>
                    title: pwStep.title,
                };
                // eslint-disable-next-line
                // @ts-ignore
                stepToConnectTo.steps.push(pwStepToAdd);
            } else {
                // eslint-disable-next-line
                // @ts-ignore
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
                    // eslint-disable-next-line
                    // @ts-ignore
                    JsonReporter.connectToRightStep(pwStep, stepsPerRun[runIdx]);
                }
            });
        });
        const newExecution: TestExecution = {
            testCaseId: test.id,
            titlePath: JsonReporter.getTitlePath(test),
            // eslint_disable-next-line no-underscore-dangle
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

    // eslint-disable-next-line class-methods-use-this
    printsToStdio(): boolean {
        return false;
    }
}
export default JsonReporter;
