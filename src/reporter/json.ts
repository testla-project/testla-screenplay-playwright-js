import { ExecStatus, STRUCTURED_LOGS_ENVVAR_NAME } from '@testla/screenplay';
import type {
    FullResult,
    Reporter, TestCase, TestResult,
} from '@playwright/test/reporter';
import { rm, appendFileSync, existsSync } from 'fs';
import { Readable } from 'stream';
import { FilterEventStream } from '../streams/FilterEvent';
import { ParseEventStream } from '../streams/ParseEvent';
import { streamToTestExecutionDetails } from '../utils/stream';
import { TestExecution } from '../types';

class JsonReporter implements Reporter {
    protected outputFile: string;

    protected executions: TestExecution[] = [];

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

    async onTestEnd(test: TestCase, result: TestResult) {
        const steps = await streamToTestExecutionDetails(
            Readable.from(result.stdout)
                .pipe(new FilterEventStream())
                .pipe(new ParseEventStream()),
        );
        const newExecution: TestExecution = {
            title: JsonReporter.getTestId(test),
            // eslint_disable-next-line no-underscore-dangle
            project: test.parent.parent?.parent?.title || '',
            suite: test.parent.parent?.title || '',
            status: result.status.toString() as ExecStatus,
            startTime: result.startTime,
            duration: result.duration,
            location: test.location,
            steps,
        };
        this.executions.push(newExecution);
    }

    onEnd(result: FullResult): void {
        const report = {
            ...result,
            executions: this.executions,
        };
        this.write(JSON.stringify(report, null, 2));
    }

    // eslint-disable-next-line class-methods-use-this
    printsToStdio(): boolean {
        return false;
    }
}
export default JsonReporter;
