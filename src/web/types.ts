export type SelectorOptionsState = 'visible' | 'hidden' | 'attached' | 'detached';

export type SubSelector = [
    string, {
        hasText?: string;
        timeout?: number;
        subSelector?: SubSelector;
        state?: SelectorOptionsState;
    }?
];

export type SelectorOptions = {
    hasText?: string | RegExp | undefined;
    subSelector?: SubSelector;
    timeout?: number;
    state?: SelectorOptionsState;
};
