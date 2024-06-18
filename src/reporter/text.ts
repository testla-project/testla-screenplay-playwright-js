import { STRUCTURED_LOGS_ENVVAR_NAME } from '@testla/screenplay';
import type {
    FullResult,
    Reporter, TestCase, TestResult, TestStatus,
} from '@playwright/test/reporter';
import { rm, appendFileSync, existsSync } from 'fs';
import { Readable } from 'stream';
import { FilterEventStream } from '../streams/FilterEvent';
import { TransformEventToTextStream } from '../streams/EventToTextTransformer';
import { ParseEventStream } from '../streams/ParseEvent';
import { streamToString } from '../utils/stream';
import { ICON } from '../constants';

class TextReporter implements Reporter {
    private outputFile: string;

    private passed: string[] = [];

    private flaky: string[] = [];

    private failed: string[] = [];

    private skipped: string[] = [];

    private interrupted: string[] = [];

    constructor(config: any) {
        this.outputFile = `${config.configDir}/${config.outputFile || 'screenplay-report.txt'}`;
    }

    private putIntoBucket(testId: string, status: TestStatus) {
        switch (status) {
            case 'skipped':
                this.skipped.push(testId);
                break;
            case 'interrupted':
                this.interrupted.push(testId);
                break;
            case 'failed':
            case 'timedOut':
                if (!this.failed.some((entry) => entry === testId)) {
                    this.failed.push(testId);
                }
                break;
            case 'passed':
            default:
                if (this.failed.some((entry) => entry === testId)) {
                    this.failed = this.failed.filter((entry) => entry !== testId);
                    this.flaky.push(testId);
                }
                this.passed.push(testId);
        }
    }

    private static getResultStatusIcon(status: TestStatus) {
        switch (status) {
            case 'failed':
                return ICON.FAIL;
            case 'timedOut':
                return ICON.FAIL;
            case 'interrupted':
                return ICON.FAIL;
            case 'skipped':
                return ICON.SKIP;
            case 'passed':
            default:
                return ICON.PASS;
        }
    }

    private static getTestId = (test: TestCase) => {
        const paths = test.titlePath();
        return paths.filter((entry: string) => entry !== '').join(' > ');
    };

    private write(msg: string) {
        if (this.outputFile) {
            appendFileSync(this.outputFile, `${msg}\n`);
        }
    }

    onBegin() {
        if (this.outputFile && existsSync(this.outputFile)) {
            rm(this.outputFile, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

        process.env[STRUCTURED_LOGS_ENVVAR_NAME] = 'true';
    }

    async onTestEnd(test: TestCase, result: TestResult) {
        // eslint-disable-next-line
        // @ts-ignore
        // eslint-disable-next-line
        this.write(`[${test._projectId.toUpperCase()}] ${TextReporter.getResultStatusIcon(result.status)} ${test.parent.title} › ${test.title} ${result.retry > 0 ? `[RETRY#${result.retry}] ` : ''}[${result.status.toUpperCase()} after ${TextReporter.printRuntime(result.duration)}]`);
        if (result.status !== 'skipped') {
            this.write('────────────────────────────────');
        }

        // eslint-disable-next-line no-await-in-loop
        const reportString = await streamToString(
            Readable.from(result.stdout)
                .pipe(new FilterEventStream())
                .pipe(new ParseEventStream())
                .pipe(new TransformEventToTextStream()),
        );
        this.write(reportString);

        this.putIntoBucket(TextReporter.getTestId(test), result.status);
    }

    onEnd(result: FullResult) {
        this.write('────────────────────────────────\n');
        this.write(`Finished the run: ${result.status.toUpperCase()} after ${TextReporter.printRuntime(result.duration)}\n`);
        if (this.failed.length) {
            this.write(`Failed: ${this.failed.length}`);
            this.failed.sort().forEach((failed: string) => this.write(`    - ${TextReporter.reformatFailedString(failed)}`));
        }
        if (this.skipped.length) {
            this.write(`Skipped: ${this.skipped.length}`);
        }
        if (this.flaky.length) {
            this.write(`Flaky: ${this.flaky.length}`);
        }
        if (this.interrupted.length) {
            this.write(`Interrupted: ${this.interrupted.length}`);
        }
        if (this.passed.length) {
            this.write(`Passed: ${this.passed.length}`);
        }
    }

    private static printRuntime = (time: number) => `${(Math.round(time * 1000) / 1000000).toFixed(3)}s`;

    private static reformatFailedString = (str: string) => {
        const firstArrowReplaced = str.replace('>', '›');
        const parts = firstArrowReplaced.split('›');
        return `[${parts[0].trim().toUpperCase()}] ✗ ${parts[1].trim().replaceAll('>', '›')}`;
    };

    // eslint-disable-next-line class-methods-use-this
    printsToStdio(): boolean {
        return false;
    }
}
export default TextReporter;
