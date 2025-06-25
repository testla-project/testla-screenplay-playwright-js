import { FullResult, TestStatus } from '@playwright/test/reporter';
import { EXEC_STATUS, ExecStatus, STRUCTURED_LOGS_ENVVAR_NAME } from '@testla/screenplay';
import {
    existsSync,
    rm,
} from 'fs';
import { ActivityDetail } from '@testla/screenplay/lib/interfaces';
import JsonReporter from './json';
import { TestExecution, TestExecutionRun, InternalTestExecutionStep } from '../types';
import { BLANKS_PER_INDENTATION_LEVEL, ICON } from '../constants';

class TextReporter extends JsonReporter {
    protected outputFile: string;

    constructor(config: any) {
        super(config);
        this.outputFile = `${config.configDir}/${config.outputFile || 'screenplay-report.txt'}`;
    }

    private static getResultStatusIcon(status: string): string {
        switch (status) {
            case 'failed':
                return ICON.FAIL;
            case 'timedOut':
                return ICON.FAIL;
            case 'interrupted':
                return ICON.FAIL;
            case 'skipped':
                return ICON.SKIP;
            case EXEC_STATUS.START:
                return ICON.EXEC;
            case 'passed':
            default:
                return ICON.PASS;
        }
    }

    private static getTitle(titlePath: string[]): string {
        return titlePath.join(' > ');
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

    onEnd(result: FullResult): void {
        const report = {
            ...result,
            executions: Array.from(this.executions.values()),
        };

        report.executions.forEach((execution) => {
            this.writeRunDetails(execution);
        });
        this.writeSummary(report);
    }

    private static printRuntime(time: number): string {
        return `${(Math.round(time * 1000) / 1000000).toFixed(3)}s`;
    }

    private static reformatFailedString(str: string): string {
        const firstArrowReplaced = str.replace('>', '›');
        const parts = firstArrowReplaced.split('›');
        return `[${parts[0].trim().toUpperCase()}] ✗ ${parts[1].trim().replaceAll('>', '›')}`;
    }

    private static checkIsFlaky(runs: TestExecutionRun[]): boolean {
        // Todo: the status here is success - needs to be cleaned up
        return runs.length > 1 && runs[runs.length - 1].status as string === 'passed';
    }

    private static getExecutionStatus(execution: TestExecution) {
        return TextReporter.checkIsFlaky(execution.runs)
            ? 'flaky'
            : execution.runs[execution.runs.length - 1].status;
    }

    private static getStatusText(status: ExecStatus) {
        let badge = '';
        switch (status) {
            case EXEC_STATUS.START:
                badge = 'EXEC';
                break;
            case EXEC_STATUS.FAILED:
                badge = 'FAIL';
                break;
            case EXEC_STATUS.SKIPPED:
                badge = 'SKIP';
                break;
            default:
                badge = 'DONE';
        }
        return badge;
    }

    private static indent(level: number) {
        let indentation = ' ';

        for (let i = 0; i <= level * BLANKS_PER_INDENTATION_LEVEL; i += 1) {
            indentation = ` ${indentation}`;
        }

        return indentation;
    }

    private static renderActivityDetails(details: ActivityDetail[]) {
        return details.map((detail) => {
            let detailString = detail.methodName;
            if (detail.parameters) {
                const paramList: string[] = [];
                Object.entries(detail.parameters || {}).forEach(([, value], innerIdx) => {
                    paramList.push(
                        typeof value === 'string' ? `"${value}"` : `${value}`,
                    );
                });
                detailString += `(${paramList.join(', ')})`;
            }
            return detailString;
        }).join('.');
    }

    private static getStepDetails(step: InternalTestExecutionStep, indentLevel = 0, isBefore = false): string {
        const statusToUse = isBefore ? EXEC_STATUS.START : step.status as ExecStatus;
        const startTimeToUse = isBefore
            ? step.startTime
            : new Date(new Date(step.startTime).getTime() + (step.duration || 0)).toISOString();
        return `${
            startTimeToUse
        }  [${
            TextReporter.getStatusText(statusToUse)
        }]${
            TextReporter.indent(indentLevel)
        }${
            this.getResultStatusIcon(statusToUse as TestStatus)
        } ${
            step.actor
        } ${
            step.activityAction
        } ${
            TextReporter.renderActivityDetails(step.activityDetails)
        }  (${step.location.file}:${step.location.line})`;
    }

    private writeStepDetails(step: InternalTestExecutionStep, indentLevel = 0): void {
        const stepDetailsBefore = TextReporter.getStepDetails(step, indentLevel, true);
        this.write(stepDetailsBefore);

        if (step.steps && step.steps.length > 0) {
            step.steps.forEach((subStep) => {
                if (subStep.category === undefined) {
                    this.writeStepDetails(subStep, indentLevel + 1);
                }
            });
        }

        const stepDetails = TextReporter.getStepDetails(step, indentLevel);
        this.write(stepDetails);
    }

    private writeRunDetails(execution: TestExecution): void {
        execution.runs.forEach((run, runIdx) => {
            this.write(`[${execution.project.toUpperCase()}] ${TextReporter.getResultStatusIcon(run.status as TestStatus)} ${TextReporter.getTitle(execution.titlePath)} ${runIdx > 0 ? `[RETRY#${runIdx}] ` : ''}[${run.status.toUpperCase()} after ${TextReporter.printRuntime(run.duration || 0)}]`);
            if (TextReporter.getStatusText(run.status) !== 'skipped') {
                this.write('────────────────────────────────');
            }

            run.steps?.forEach((step) => {
                this.writeStepDetails(step as InternalTestExecutionStep);
            });

            this.write('');
        });
    }

    private writeSummary(report: FullResult & { executions: TestExecution[] }): void {
        const failedExecutions = report.executions.filter((execution) => TextReporter.getExecutionStatus(execution) === 'failed').map((execution) => TextReporter.getTitle([execution.project, ...execution.titlePath]));
        const skippedCount = report.executions.filter((execution) => TextReporter.getExecutionStatus(execution) === 'skipped').length;
        const flakyCount = report.executions.filter((execution) => TextReporter.getExecutionStatus(execution) === 'flaky').length;
        const interruptedCount = report.executions.filter((execution) => TextReporter.getExecutionStatus(execution) === 'interrupted').length;
        const passedCount = report.executions.filter((execution) => TextReporter.getExecutionStatus(execution) as string === 'passed').length;
        this.write('────────────────────────────────\n');
        this.write(`Finished the run: ${report.status.toUpperCase()} after ${TextReporter.printRuntime(report.duration)}\n`);
        if (failedExecutions.length) {
            this.write(`Failed: ${failedExecutions.length}`);
            failedExecutions.sort().forEach((failed: string) => this.write(`    - ${TextReporter.reformatFailedString(failed)}`));
        }
        if (skippedCount) {
            this.write(`Skipped: ${skippedCount}`);
        }
        if (flakyCount) {
            this.write(`Flaky: ${flakyCount}`);
        }
        if (interruptedCount) {
            this.write(`Interrupted: ${interruptedCount}`);
        }
        if (passedCount) {
            this.write(`Passed: ${passedCount}`);
        }
    }
}

export default TextReporter;
