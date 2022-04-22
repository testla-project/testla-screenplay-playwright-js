import { Locator, Page } from '@playwright/test';
import { SelectorOptions, SubSelector } from '../types';

const subLocatorLookup = ({ page, locator, subSelector }: { page: Page; locator: Locator; subSelector?: SubSelector }): Locator => {
    let resolvedLocator: Locator = locator;
    if (subSelector) {
        resolvedLocator = resolvedLocator.locator(subSelector[0], { hasText: subSelector[1]?.hasText });
        if (subSelector[1]?.subSelector) {
            resolvedLocator = subLocatorLookup({ page, locator: resolvedLocator, subSelector: subSelector[1]?.subSelector });
        }
    }
    return resolvedLocator;
};

export const recursiveLocatorLookup = ({ page, selector, options }: { page: Page; selector: string; options?: SelectorOptions }) => {
    const locator = page.locator(selector, { hasText: options?.hasText });
    return subLocatorLookup({ page, locator, subSelector: options?.subSelector });
};
