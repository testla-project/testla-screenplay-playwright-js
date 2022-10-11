import { Locator, Page } from '@playwright/test';
import { Selector, SelectorOptions, SubSelector } from './types';

const subLocatorLookup = async ({
    page, locator, timeout, subSelector,
}: { page: Page; locator: Locator; timeout?: number; subSelector?: SubSelector }): Promise<Locator> => {
    let resolvedLocator: Locator = locator;
    // wait for selector to become visible based on timeout options
    await resolvedLocator.waitFor({ timeout });
    // check if we have subselectors
    if (subSelector) {
        // find: if selector is a string, need to find it using page.locator(), if it is already a Playwright Locator use it directly.
        if (typeof subSelector[0] === 'string') {
            resolvedLocator = resolvedLocator.locator(subSelector[0], { hasText: subSelector[1]?.hasText });
        } else {
            // eslint-disable-next-line prefer-destructuring
            resolvedLocator = subSelector[0];
        }
        // wait for sub selector to become visible based on timeout options
        await resolvedLocator.waitFor({ timeout });

        if (subSelector[1]?.subSelector) {
            resolvedLocator = await subLocatorLookup({
                page, locator: resolvedLocator, timeout: subSelector[1]?.timeout, subSelector: subSelector[1]?.subSelector,
            });
        }
    }
    return Promise.resolve(resolvedLocator);
};

export const recursiveLocatorLookup = async ({ page, selector, options }: { page: Page; selector: Selector; options?: SelectorOptions }): Promise<Locator> => {
    // find first level locator
    const locator = typeof selector === 'string' ? page.locator(selector, { hasText: options?.hasText }) : selector;
    // pass the first level locator into sub locator lookup
    return subLocatorLookup({
        page, locator, timeout: options?.timeout, subSelector: options?.subSelector,
    });
};
