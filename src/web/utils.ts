/* eslint-disable vars-on-top */
import { FrameLocator, Locator, Page } from '@playwright/test';
import {
    FrameSelector,
    Selector, SelectorOptions, SelectorOptionsState, SubSelector,
} from './types';

// dealing with selector == Playwright Locator and options.hasText
const getSubLocator = async (locator: Locator, subLocator?: Locator, text?: string | RegExp): Promise<Locator> => locator.filter({ has: subLocator, hasText: text });

const subLocatorLookup = async ({
    base, locator, timeout, subSelector, state = 'visible', evaluateVisible = true,
}: { base: Page | FrameLocator; locator: Locator; timeout?: number; subSelector?: SubSelector; state?: SelectorOptionsState; evaluateVisible?: boolean }): Promise<Locator> => {
    let resolvedLocator: Locator = locator;
    // wait for selector to become visible based on timeout options
    if (evaluateVisible) {
        await resolvedLocator.waitFor({ timeout, state });
    }
    // check if we have subselectors
    if (subSelector) {
        // subSelector: if selector is a string, need to find it using page.locator(), if it is already a Playwright Locator use it directly.
        // PROBLEM: if we use the Playwright locator directly, it does not consider the parent selector anymore -> can lead to problems regarding resolving to multiple elements
        if (typeof subSelector[0] === 'string') {
            resolvedLocator = resolvedLocator.locator(subSelector[0], { hasText: subSelector[1]?.hasText });
        } else if (typeof subSelector[0] === 'function') {
            resolvedLocator = subSelector[0](base);
        } else {
            resolvedLocator = await getSubLocator(resolvedLocator, subSelector[0], subSelector[1]?.hasText);
        }

        // wait for sub selector to become visible based on timeout options
        await resolvedLocator.waitFor({ timeout });

        if (subSelector[1]?.subSelector) {
            resolvedLocator = await subLocatorLookup({
                base, locator: resolvedLocator, timeout: subSelector[1]?.timeout, subSelector: subSelector[1]?.subSelector, state: subSelector[1]?.state,
            });
        }
    }
    return Promise.resolve(resolvedLocator);
};

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
    const base = frameTree === undefined || frameTree.length === 0 ? page : recursiveFrameLookup(page, frameTree);

    let locator;
    if (typeof selector === 'string') {
        locator = base.locator(selector, { hasText: options?.hasText });
    } else if (typeof selector === 'function') {
        locator = selector(base);
    } else {
        locator = await getSubLocator(selector, undefined, options?.hasText);
    }

    // pass the first level locator into sub locator lookup
    return subLocatorLookup({
        base, locator, timeout: options?.timeout, subSelector: options?.subSelector, state: options?.state, evaluateVisible: options?.evaluateVisible,
    });
};
