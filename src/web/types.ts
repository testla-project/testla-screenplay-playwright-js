import { Locator } from 'playwright';

export type SubSelector = [
    Selector, {
        hasText?: string;
        timeout?: number;
        subSelector?: SubSelector;
    }?
];

export type SelectorOptions = {
    hasText?: string | RegExp | undefined;
    subSelector?: SubSelector;
    timeout?: number;
};

export type Selector = string | Locator;
