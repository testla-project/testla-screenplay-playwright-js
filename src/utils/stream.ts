import { Readable } from 'stream';
import { LogEvent, EXEC_STATUS } from '@testla/screenplay';
import { TestExecutionSteps, TestExecutionStep } from '../types';

export const streamToString = (stream: Readable): Promise<string> => {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk: string) => chunks.push(Buffer.from(`${chunk}\n`)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
};

export const streamToTestExecutionDetails = (stream: Readable): Promise<TestExecutionSteps | undefined> => {
    const report: { steps?: TestExecutionSteps } = {};
    let prevWrapLevel = 0;
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk: LogEvent) => {
            let parent = report;
            if (chunk.wrapLevel > 0) {
                for (let i = 0; i < chunk.wrapLevel; i += 1) {
                    if (parent.steps === undefined) {
                        parent.steps = [];
                    }
                    parent = parent.steps[parent.steps.length - 1];
                }
            }
            if (chunk.status === EXEC_STATUS.START.toString()) {
                if (parent.steps === undefined) {
                    parent.steps = [];
                }
                parent.steps.push({
                    activityType: chunk.activityType,
                    activityAction: chunk.activityAction,
                    activityDetails: chunk.activityDetails,
                    status: chunk.status,
                    actor: chunk.actor,
                    // filePath: chunk.filePath,
                    location: chunk.location,
                    // skipOnFailLevel: chunk.skipOnFailLevel,
                    startTime: chunk.time,
                });
            } else if (parent.steps) {
                // const oldState = report[report.length - 1];
                const oldState = parent.steps[parent.steps.length - 1];
                // eslint-disable-next-line
                // @ts-ignore
                const newState: TestExecutionStep = {
                    ...oldState,
                    duration: new Date(chunk.time).getTime() - new Date(oldState.startTime).getTime(),
                    status: chunk.status,
                };
                // report[report.length - 1] = newState;
                parent.steps[parent.steps.length - 1] = newState;
            }
            prevWrapLevel = chunk.wrapLevel;
        });
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(report.steps));
    });
};
