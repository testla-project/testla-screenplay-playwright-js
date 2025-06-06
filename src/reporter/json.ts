import { ExecStatus, STRUCTURED_LOGS_ENVVAR_NAME } from '@testla/screenplay';
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

    private static getTestId(test: TestCase): string {
        const paths = test.titlePath();
        return paths.filter((entry: string) => entry !== '').slice(2).join(' > ');
    }

    protected write(msg: string) {
        if (this.outputFile) {
            appendFileSync(this.outputFile, `${msg}\n`);
        }
    }

    protected static isPwStepInStep(pwStep: TestStep, step: TestExecutionStep): boolean {
        const stepStartTime = new Date(step.startTime);
        return pwStep.startTime.getTime() >= stepStartTime.getTime()
            && pwStep.startTime.getTime() <= (stepStartTime.getTime() + (step.duration || 0));
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
                    // find the right parent step
                    const stepToConnectTo = stepsPerRun[runIdx]?.find((step) => JsonReporter.isPwStepInStep(pwStep, step));
                    if (stepToConnectTo) {
                        if (!stepToConnectTo.steps) {
                            stepToConnectTo.steps = [];
                        }
                        const pwStepToAdd: PwStepInTestExecution = {
                            category: pwStep.category,
                            duration: pwStep.duration,
                            error: pwStep.error,
                            location: pwStep.location,
                            startTime: pwStep.startTime,
                            // steps: Array<TestStep>
                            title: pwStep.title,
                        };
                        stepToConnectTo.steps.push(pwStepToAdd);
                    }
                }
            });
        });
        const newExecution: TestExecution = {
            testCaseId: test.id,
            title: JsonReporter.getTestId(test),
            // eslint_disable-next-line no-underscore-dangle
            project: test.parent.parent?.parent?.title || '',
            suite: test.parent.parent?.title || '',
            location: test.location,
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
