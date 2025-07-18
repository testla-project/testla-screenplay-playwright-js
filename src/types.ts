import { FullResult, Location, TestError } from '@playwright/test/reporter';
import { ActivityType, ExecStatus, ActivityDetail } from '@testla/screenplay/lib/interfaces';

export type CheckMode = 'positive' | 'negative';

type TestExecutionStepBase = {
    status: ExecStatus;
    steps?: TestExecutionStep[];
    location?: Location;
    startTime: Date;
    duration?: number;
    isPW?: boolean; // identifies if playwright step or testla step - derived from category attribute
}

export type TestExecutionStepInternal = TestExecutionStepBase & {
    actor: string;
    activityType: ActivityType;
    activityAction: string;
    activityDetails: ActivityDetail[];
}

export type TestExecutionStepPW = TestExecutionStepBase & {
    title: string;
    error?: TestError; // only PW
}

export type TestExecutionStep = TestExecutionStepInternal | TestExecutionStepPW;

export type TestExecutionSteps = TestExecutionStep[];

export type TestExecutionRun = {
    status: ExecStatus;
    startTime: Date;
    duration?: number;
    steps?: TestExecutionSteps;
};

export type TestExecution = {
    testCaseId: string; // playwright testcase id
    titlePath: string[];
    project: string;
    suite: string;
    location: Location;
    runs: TestExecutionRun[];
};

export type JsonReport = FullResult & {
    executions: TestExecution[];
}
