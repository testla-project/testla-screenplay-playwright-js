// the whole utils functions shall go into BrowseTheWeb after deprecated methods have ben removed there
import { FrameLocator, Locator, Page } from '@playwright/test';
import {
    FrameSelector,
    Selector, SelectorOptions, SelectorOptionsState, SubSelector,
} from './types';

/**
 * Filters an existing locator based on sublocator and/or text
 * @param locator parent locator
 * @param subLocator sub locator to be checked for
 * @param text to be checked for
 * @returns filtered locator
 */
const filterLocator = async (locator: Locator, subLocator?: Locator, text?: string | RegExp): Promise<Locator> => locator.filter({ has: subLocator, hasText: text });

/**
 * Calls a callback function based on the selectors type
 * @param selector The selector determining the further proceeding
 * @param proceedOptions Options to proceed based on types string, function or Locator
 * @returns Result of the proceeding function
 */
const typeBasedProceeding = async (selector: Selector, proceedOptions: { str: Function; fn: Function; loc: Function }) => {
    if (typeof selector === 'string') {
        return proceedOptions.str();
    }
    if (typeof selector === 'function') {
        return proceedOptions.fn();
    }
    return proceedOptions.loc();
};

/**
 * Recursively resolves subSelectors starting with a Locator
 * @param param Object with all required parameters
 * @returns Promise<Locator> where Locator is a Playwright Locator
 */
const subLocatorLookup = async ({
    base, locator, timeout, subSelector, state = 'visible', evaluateVisible = true,
}: { base: Page | FrameLocator; locator: Locator; timeout?: number; subSelector?: SubSelector; state?: SelectorOptionsState; evaluateVisible?: boolean }): Promise<Locator> => {
    let resolvedLocator: Locator = locator;
    // wait for selector to become visible based on timeout options
    // in some cases it is desired to not have to wait for the visible state
    if (evaluateVisible) {
        await resolvedLocator.waitFor({ timeout, state });
    }
    // check if we have subselectors
    // PROBLEM: if we use the Playwright locator directly, it does not consider the parent selector anymore -> can lead to problems regarding resolving to multiple elements
    if (subSelector) {
        resolvedLocator = await typeBasedProceeding(subSelector[0], {
            // if selector is a string, need to find it using locator.locator()
            str: () => resolvedLocator.locator(subSelector[0] as string, { hasText: subSelector[1]?.hasText }),
            // in case of selector is a function we will propagate the current base (which i.e. is page) to it so that we can use build constructs like page.getByRole
            fn: () => (subSelector[0] as Function)(base),
            // if it is already a Playwright Locator use it directly.
            loc: () => filterLocator(resolvedLocator, subSelector[0] as Locator, subSelector[1]?.hasText),
        });

        // wait for sub selector to become visible based on timeout options
        // this is required so that functionality like click can be triggered on it
        await resolvedLocator.waitFor({ timeout, state: 'visible' });

        // recursively lookup the next level if next subselector set
        if (subSelector[1]?.subSelector) {
            resolvedLocator = await subLocatorLookup({
                base, locator: resolvedLocator, timeout: subSelector[1]?.timeout, subSelector: subSelector[1]?.subSelector, state: subSelector[1]?.state,
            });
        }
    }
    return Promise.resolve(resolvedLocator);
};

/**
 * Recursively resolves frames starting with Page Object
 * @param page Plawrights page object
 * @param frameTree An array of FrameLocators
 * @returns FrameLocator
 */
export const recursiveFrameLookup = (page: Page, frameTree: FrameSelector[]): FrameLocator => {
    let base = page as unknown as FrameLocator;
    frameTree.forEach((node) => {
        base = base.frameLocator(node);
    });
    return base;
};

export const recursiveLocatorLookup = async ({
    page, selector, options, frameTree,
}: { page: Page; selector: Selector; options?: SelectorOptions, frameTree?: FrameSelector[] }): Promise<Locator> => {
    // if frameTree has entries resocle FrameLocators before proceeding
    const base = frameTree === undefined || frameTree.length === 0
        ? page
        : recursiveFrameLookup(page, frameTree);

    const locator = await typeBasedProceeding(selector, {
        // if selector is a string, need to find it using page.locator()
        str: () => base.locator(selector as string, { hasText: options?.hasText }),
        // in case of selector is a function we will propagate the current base (which i.e. is page) to it so that we can use build constructs like page.getByRole
        fn: () => (selector as Function)(base),
        // if it is already a Playwright Locator use it directly.
        loc: () => filterLocator(selector as Locator, undefined, options?.hasText),
    });

    // pass the first level locator into sub locator lookup
    return subLocatorLookup({
        base, locator, timeout: options?.timeout, subSelector: options?.subSelector, state: options?.state, evaluateVisible: options?.evaluateVisible,
    });
};
