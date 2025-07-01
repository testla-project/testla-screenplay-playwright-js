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
            if (chunk.status === EXEC_STATUS.STARTED) {
                if (parent.steps === undefined) {
                    parent.steps = [];
                }
                parent.steps.push({
                    actor: chunk.actor,
                    activityType: chunk.activityType,
                    activityAction: chunk.activityAction,
                    activityDetails: chunk.activityDetails,
                    status: chunk.status,
                    location: chunk.location,
                    startTime: chunk.time,
                });
            } else if (parent.steps) {
                const oldState = parent.steps[parent.steps.length - 1];
                const newState: TestExecutionStep = {
                    ...oldState,
                    duration: new Date(chunk.time).getTime() - new Date(oldState.startTime).getTime(),
                    status: chunk.status,
                };
                parent.steps[parent.steps.length - 1] = newState;
            }
        });
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(report.steps));
    });
};
