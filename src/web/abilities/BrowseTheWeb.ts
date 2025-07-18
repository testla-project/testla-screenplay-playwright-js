import { FrameLocator, Locator, Page } from '@playwright/test';
import { Ability, Actor } from '@testla/screenplay';
import {
    FrameSelector, Selector, SelectorOptions,
    SelectorOptionsState, SubSelector,
} from '../types';

/**
 * This class represents the actor's ability to use a Browser.
 */
export class BrowseTheWeb extends Ability {
    /**
     * Initialize this Ability by passing an already existing Playwright Page object.
     *
     * @param {Page} page the Playwright Page that will be used to browse.
     * @return {BrowseTheWeb} Returns the ability to use a browser
     */
    public static using(page: Page): BrowseTheWeb {
        return new BrowseTheWeb(page);
    }

    /**
     * Use this Ability as an Actor.
     *
     * @param {Actor} actor Actor is using this ability
     * @param {string} alias defined the alias to be used for the given ability
     * @return {BrowseTheWeb} The ability to use BrowseTheWeb as the actor
     */
    public static as(actor: Actor, alias?: string): BrowseTheWeb {
        return actor.withAbilityTo(this, alias) as BrowseTheWeb;
    }

    /**
     * Initialize this Ability by passing an already existing Playwright Page object.
     *
     * @param {Page} page the Playwright Page that will be used to browse.
     */
    private constructor(private page: Page) {
        super();
    }

    /**
     * Get the page object
     *
     * @returns {Page} the page object
     */
    public getPage(): Page {
        return this.page;
    }

    /**
     * Filters an existing locator based on sublocator and/or text
     * @param locator parent locator
     * @param subLocator sub locator to be checked for
     * @param text to be checked for
     * @returns filtered locator
     */
    private static async filterLocator(locator: Locator, subLocator?: Locator, text?: string | RegExp): Promise<Locator> {
        return locator.filter({ has: subLocator, hasText: text });
    }

    /**
     * Calls a callback function based on the selectors type
     * @param selector The selector determining the further proceeding
     * @param proceedOptions Options to proceed based on types string, function or Locator
     * @returns Result of the proceeding function
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    private static async typeBasedProceeding(selector: Selector, proceedOptions: { str: Function; fn: Function; loc: Function }) {
        if (typeof selector === 'string') {
            return proceedOptions.str();
        }
        if (typeof selector === 'function') {
            return proceedOptions.fn();
        }
        return proceedOptions.loc();
    }

    /**
     * Recursively resolves subSelectors starting with a Locator
     * @param param Object with all required parameters
     * @returns Promise<Locator> where Locator is a Playwright Locator
     */
    private static async subLocatorLookup({
        base, locator, timeout, subSelector, state = 'visible', evaluateVisible = true,
    }: { base: Page | FrameLocator; locator: Locator; timeout?: number; subSelector?: SubSelector; state?: SelectorOptionsState; evaluateVisible?: boolean }): Promise<Locator> {
        let resolvedLocator: Locator = locator;
        // wait for selector to become visible based on timeout options
        // in some cases it is desired to not have to wait for the visible state
        if (evaluateVisible) {
            await resolvedLocator.waitFor({ timeout, state });
        }
        // check if we have subselectors
        // PROBLEM: if we use the Playwright locator directly, it does not consider the parent selector anymore -> can lead to problems regarding resolving to multiple elements
        if (subSelector) {
            resolvedLocator = await BrowseTheWeb.typeBasedProceeding(subSelector[0], {
                // if selector is a string, need to find it using locator.locator()
                str: () => resolvedLocator.locator(subSelector[0] as string, { hasText: subSelector[1]?.hasText }),
                // in case of selector is a function we will propagate the current base (which i.e. is page) to it so that we can use build constructs like page.getByRole
                // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
                fn: () => (subSelector[0] as Function)(base),
                // if it is already a Playwright Locator use it directly.
                loc: () => BrowseTheWeb.filterLocator(resolvedLocator, subSelector[0] as Locator, subSelector[1]?.hasText),
            });

            // wait for sub selector to become visible based on timeout options
            // this is required so that functionality like click can be triggered on it
            await resolvedLocator.waitFor({ timeout, state: 'visible' });

            // recursively lookup the next level if next subselector set
            if (subSelector[1]?.subSelector) {
                resolvedLocator = await this.subLocatorLookup({
                    base, locator: resolvedLocator, timeout: subSelector[1]?.timeout, subSelector: subSelector[1]?.subSelector, state: subSelector[1]?.state,
                });
            }
        }
        return Promise.resolve(resolvedLocator);
    }

    /**
     * Recursively resolves frames starting with Page Object
     * @param page Plawrights page object
     * @param frameTree An array of FrameLocators
     * @returns FrameLocator
     */
    private static recursiveFrameLookup(page: Page, frameTree: FrameSelector[]): FrameLocator {
        let base = page as unknown as FrameLocator;
        frameTree.forEach((node) => {
            base = base.frameLocator(node);
        });
        return base;
    }

    /**
     * Use the page mouse to hover over the specified element.
     *
     * @param {Selector} selector the selector of the element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @return {Locator} Returns resolved Locator(s) as per Playwright definition.
     */
    public async resolveSelectorToLocator(selector: Selector, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<Locator> {
        const { page } = this;

        // if frameTree has entries resocle FrameLocators before proceeding
        const base = frameTree === undefined || frameTree.length === 0
            ? page
            : BrowseTheWeb.recursiveFrameLookup(page, frameTree);

        const locator = await BrowseTheWeb.typeBasedProceeding(selector, {
            // if selector is a string, need to find it using page.locator()
            str: () => base.locator(selector as string, { hasText: options?.hasText }),
            // in case of selector is a function we will propagate the current base (which i.e. is page) to it so that we can use build constructs like page.getByRole
            // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
            fn: () => (selector as Function)(base),
            // if it is already a Playwright Locator use it directly.
            loc: () => BrowseTheWeb.filterLocator(selector as Locator, undefined, options?.hasText),
        });

        // pass the first level locator into sub locator lookup
        return BrowseTheWeb.subLocatorLookup({
            base, locator, timeout: options?.timeout, subSelector: options?.subSelector, state: options?.state, evaluateVisible: options?.evaluateVisible,
        });
    }
}
