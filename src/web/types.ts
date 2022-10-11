import { Locator } from 'playwright';

export type Selector = string | Locator;

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
