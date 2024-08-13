import { FrameLocator, Locator, Page } from '@playwright/test';

export type LazySelector = (page: Page | FrameLocator) => Locator;

export type Selector = string | Locator | LazySelector;

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
    evaluateVisible?: boolean;
};

export type Maskable = {
    maskInLogs?: boolean;
};
