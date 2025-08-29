import { Actor } from "@testla/screenplay";

export type ActionStrategyExecuteParams = {
    actor: Actor;
    abilityAlias?: string;
    frameTree?: string[];
};

export type ActionPageCommand = 
    | {
        method: 'waitForLoadState';
        args: [state?: 'load' | 'domcontentloaded' | 'networkidle'];
    }
    | {
        method: 'waitForEvent';
        args: [event: string];
    }
    | {
        method: 'waitForURL';
        args: [url: string | RegExp, options?: WaitForUrlOptions];
    };

export type WaitForUrlOptions = {
    timeout?: number;
    waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
};