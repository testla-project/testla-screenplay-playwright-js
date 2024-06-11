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
                this.failed.push(testId);
                break;
            case 'passed':
            default:
                if (this.failed.some((entry) => entry === testId)) {
                    this.failed = this.failed.filter((entry) => entry !== testId)
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

    // async onStdOut(chunk: string | Buffer, test: TestCase): Promise<void> {
    //     const result = await streamToString(
    //         Readable.from(chunk)
    //             .pipe(new FilterEventStream())
    //             .pipe(new ParseEventStream())
    //             .pipe(new TransformEventToTextStream()),
    //     );
    //     this.addToResultBuffer(result, test.id);
    // }

    onBegin() {
        if (this.outputFile && existsSync(this.outputFile)) {
            rm(this.outputFile, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

        process.env.TEASLA_SCREENPLAY_STRUCTURED_LOGS = 'true';
    }

    async onTestEnd(test: TestCase, result: TestResult) {
        // test.results[0].stdout
        // this.addToResultBuffer(`${new Date().toISOString()}  [CASE]  ${TextReporter.getResultStatusIcon(result.status)} ${test.parent.title} > ${test.title} [${test._projectId.toUpperCase()}]  [${result.status.toUpperCase()}] (${TextReporter.printRuntime(result.duration)})`, test.id);
        // this.write(`${new Date().toISOString()}  [CASE${result.retry > 0 ? ` RETRY#${result.retry}` : ''}]  ${TextReporter.getResultStatusIcon(result.status)} ${test.parent.title} > ${test.title} [${test._projectId.toUpperCase()}] [${result.status.toUpperCase()}] (${TextReporter.printRuntime(result.duration)})`);
        // this.write(`${TextReporter.getResultStatusIcon(result.status)} ${test.parent.title} › ${test.title} ${result.retry > 0 ? `[RETRY#${result.retry}] ` : ''}[${result.status.toUpperCase()} after ${TextReporter.printRuntime(result.duration)}] (${test._projectId.toUpperCase()})`);
        this.write(`[${test._projectId.toUpperCase()}] ${TextReporter.getResultStatusIcon(result.status)} ${test.parent.title} › ${test.title} ${result.retry > 0 ? `[RETRY#${result.retry}] ` : ''}[${result.status.toUpperCase()} after ${TextReporter.printRuntime(result.duration)}]`);
        this.write('────────────────────────────────');
        // test.results[0].stdout.forEach((line: string): void => {

        // });
        // test.results.forEach((result, index) => {
        // eslint-disable-next-line no-restricted-syntax
        // for (const resultX of test.results) {
        //     if (resultX.retry > 0) {
        //         this.write(`--- retry #${resultX.retry} ---`);
        //     }
        // eslint-disable-next-line no-await-in-loop
        const reportString = await streamToString(
            Readable.from(result.stdout)
                .pipe(new FilterEventStream())
                .pipe(new ParseEventStream())
                .pipe(new TransformEventToTextStream()),
        );
        this.write(reportString);

        this.putIntoBucket(TextReporter.getTestId(test), result.status);
        // };
    }

    onEnd(result: FullResult) {
        this.write('────────────────────────────────\n');
        this.write(`Finished the run: ${result.status.toUpperCase()} after ${TextReporter.printRuntime(result.duration)}\n`);
        if (this.failed.length) {
            this.write(`Failed: ${this.failed.length}`);
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

    // eslint-disable-next-line class-methods-use-this
    printsToStdio(): boolean {
        return false;
    }
}
export default TextReporter;
