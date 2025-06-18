import { FullResult, Location, TestStep } from '@playwright/test/reporter';
import { ActivityType, ExecStatus, ActivityDetail } from '@testla/screenplay/lib/interfaces';

export type CheckMode = 'positive' | 'negative';

export type PwStepInTestExecution = Omit<TestStep, 'titlePath' | 'parent' | 'steps'>;

export type TestExecutionStep = {
    activityType: ActivityType;
    activityAction: string;
    activityDetails: ActivityDetail;
    status: ExecStatus;
    actor: string;
    filePath: string;
    // skipOnFailLevel: number;
    // wrapLevel: number;
    startTime: Date;
    duration?: number;
    steps?: TestExecutionSteps;
} | PwStepInTestExecution;

export type TestExecutionSteps = TestExecutionStep[];

export type TestExecutionRun = {
    status: ExecStatus;
    startTime: Date;
    duration?: number;
    steps?: TestExecutionSteps;
};

export type TestExecution = {
    testCaseId: string; // playwright testcase id
    title: string;
    project: string;
    suite: string;
    location: Location;
    runs: TestExecutionRun[];
};

export type JsonReport = FullResult & {
    executions: TestExecution[];
}
