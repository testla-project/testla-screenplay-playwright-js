import { Locator } from 'playwright';

export type Selector = string | Locator;

export type SelectorOptionsState = 'visible' | 'hidden' | 'attached' | 'detached';

export type SubSelector = [
    Selector, {
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
