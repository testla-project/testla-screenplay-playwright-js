import { Locator } from '@playwright/test';

export type Selector = string | Locator;

export type FrameSelector = string;

export type SelectorOptionsState = 'visible' | 'hidden' | 'attached' | 'detached';

export type SubSelector = [
    Selector, SelectorOptions?
];

export type SelectorOptions = {
    hasText?: string | RegExp | undefined;
    subSelector?: SubSelector;
    timeout?: number;
    state?: SelectorOptionsState;
    frameSelector?: FrameSelector;
};
