import { FullResult, Location } from '@playwright/test/reporter';
import { ActivityType, ExecStatus } from '@testla/screenplay/lib/interfaces';

export type CheckMode = 'positive' | 'negative';

export type TestExecutionStep = {
    activityType: ActivityType;
    activityAction: string;
    activityDetails: string;
    status: ExecStatus;
    actor: string;
    filePath: string;
    // skipOnFailLevel: number;
    // wrapLevel: number;
    startTime: Date;
    duration?: number;
    steps?: TestExecutionSteps;
};

export type TestExecutionSteps = TestExecutionStep[];

export type TestExecution = {
    title: string;
    project: string;
    suite: string;
    status: ExecStatus;
    startTime: Date;
    duration?: number;
    steps?: TestExecutionSteps;
    location: Location;
};

export type JsonReport = FullResult & {
    executions: TestExecution[];
}
