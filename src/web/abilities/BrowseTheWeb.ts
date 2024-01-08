import {
    Cookie, expect, Locator, Page, Response,
} from '@playwright/test';
import { Ability, Actor } from '@testla/screenplay';
import { FrameSelector, Selector, SelectorOptions } from '../types';
import { recursiveLocatorLookup } from '../utils';
import { CheckMode } from '../../types';

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
     * Use the page mouse to hover over the specified element.
     *
     * @param {Selector} selector the selector of the element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @return {Locator} Returns resolved Locator(s) as per Playwright definition.
     */
    public async resolveSelectorToLocator(selector: Selector, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<Locator> {
        const { page } = this;
        return recursiveLocatorLookup({
            page, selector, options, frameTree,
        });
    }

    /**
     * Use the page to navigate to the specified URL.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @param {string} url the url to access.
     * @return {Response} Returns the main resource response
     */
    public async goto(url: string): Promise<Response | null> {
        return this.page.goto(url);
    }

    /**
     * Reload the current page.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     */
    public async reload(): Promise<Response | null> {
        return this.page.reload();
    }

    /**
     * Wait for the specified loading state.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @param {string} status the status to wait for. Allowed: "load" | "domcontentloaded" | "networkidle".
     * @return {void} Returns when the required load state has been reached.
     */
    public async waitForLoadState(status: 'load' | 'domcontentloaded' | 'networkidle'): Promise<void> {
        return this.page.waitForLoadState(status);
    }

    /**
     * Use the page mouse to hover over the specified element.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @param {Selector} selector the selector of the element to hover over.
     * @param {SelectorOptions} options (optional) advanced selector lookup options + Modifier keys to press. Ensures that only these modifiers are pressed during the operation.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @return {void} Returns when hovered over the element
     */
    public async hover(selector: Selector, options?: SelectorOptions & { modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[] }, frameTree?: FrameSelector[]): Promise<void> {
        return (await recursiveLocatorLookup({
            page: this.page, selector, options, frameTree,
        }))
            .hover({ modifiers: options?.modifiers });
    }

    /**
     * Press the specified key(s) on the keyboard.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @param {string} input the key(s). multiple keys can be pressed by concatenating with "+"
     * @return {void} Returns when the `key` can specify the intended value or a single character to generate the text for.
     */
    public async press(input: string): Promise<void> {
        return this.page.keyboard.press(input);
    }

    /**
     * Check the specified checkbox.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the selector of the checkbox.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @return {void} Returns after checking the element
     */
    public async checkBox(selector: Selector, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<void> {
        return (await recursiveLocatorLookup({
            page: this.page, selector, options, frameTree,
        }))
            .check();
    }

    /**
     * Wait until the element of the specified selector exists.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the selector of the element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @return {Locator} Promise<Locator> returns the locator
     */
    public async waitForSelector(selector: Selector, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<Locator> {
        return recursiveLocatorLookup({
            page: this.page, selector, options, frameTree,
        });
    }

    /**
     * Drag the specified source element to the specified target element and drop it.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} sourceSelector the selector of the source element.
     * @param {Selector} targetSelector the selector of the target element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @return {void} Returns after dragging the locator to another target locator or target position
     */
    public async dragAndDrop(sourceSelector: Selector, targetSelector: Selector, options?: {
        source?: SelectorOptions;
        target?: SelectorOptions;
    }, frameTree?: FrameSelector[]): Promise<void> {
        const target = await recursiveLocatorLookup({
            page: this.page, selector: targetSelector, options: options?.target, frameTree,
        });
        return (await recursiveLocatorLookup({
            page: this.page, selector: sourceSelector, options: options?.source, frameTree,
        }))
            .dragTo(target, { targetPosition: { x: 0, y: 0 } });
    }

    /**
     * Fill the element specified by the selector with the given input.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the selector of the source element.
     * @param {string} input the input to fill the element with.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @return {void} Returns after checks, focuses the element, fills it and triggers an `input` event after filling.
     */
    public async fill(selector: Selector, input: string, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<void> {
        return (await recursiveLocatorLookup({
            page: this.page, selector, options, frameTree,
        }))
            .fill(input);
    }

    /**
     * Type the given input into the element specified by the selector.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the selector of the source element.
     * @param {string} input the input to type into the element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s) defining the location for the type event.
     * @return {void} Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.
     * @deprecated Please use pressSequentially instead. This function will be removed in the future.
     */
    public async type(selector: Selector, input: string, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<void> {
        return this.pressSequentially(selector, input, options, frameTree);
    }

    /**
     * Type the given input into the element specified by the selector.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the selector of the source element.
     * @param {string} input the input to type into the element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s) defining the location for the pressSequentially event.
     * @return {void} Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.
     */
    public async pressSequentially(selector: Selector, input: string, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<void> {
        return (await recursiveLocatorLookup({
            page: this.page, selector, options, frameTree,
        }))
            .pressSequentially(input);
    }

    /**
     * Click the element specified by the selector.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the selector of the element to click.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @return {void} Returns after clicking the element
     */
    public async click(selector: Selector, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<void> {
        return (await recursiveLocatorLookup({
            page: this.page, selector, options, frameTree,
        }))
            .click();
    }

    /**
     * Double click the element specified by the selector.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the selector of the element to double click.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s) defining the location for the double click.
     * @return {void} Returns after double clicking the element
     */
    public async dblclick(selector: Selector, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<void> {
        return (await recursiveLocatorLookup({
            page: this.page, selector, options, frameTree,
        }))
            .dblclick();
    }

    /**
     * Validate if a locator on the page is visible or hidden.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the locator to search for.
     * @param {string} mode the expected property of the selector that needs to be checked. either 'visible' or 'hidden'.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @returns {boolean} Promise<boolean> true if the element is visible/hidden as expected, false if the timeout was reached.
     */
    public async checkVisibilityState(selector: Selector, mode: CheckMode, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<boolean> {
        if (mode === 'positive') {
            await expect(await recursiveLocatorLookup({
                page: this.page, selector, options: { ...options, state: 'visible' }, frameTree,
            })).toBeVisible({ timeout: options?.timeout });
        } else {
            await expect(await recursiveLocatorLookup({
                page: this.page, selector, options: { ...options, state: 'hidden' }, frameTree,
            })).toBeHidden({ timeout: options?.timeout });
        }
        return Promise.resolve(true);
    }

    /**
     * Validate if a locator on the page is enabled or disabled.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the locator to search for.
     * @param {string} mode the expected property of the selector that needs to be checked. either 'positive' or 'negative'.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @returns {boolean} true if the element is enabled/disabled as expected, false if the timeout was reached.
     */
    public async checkEnabledState(selector: Selector, mode: CheckMode, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<boolean> {
        if (mode === 'positive') {
            await expect(await recursiveLocatorLookup({
                page: this.page, selector, options: { ...options, state: 'visible' }, frameTree,
            })).toBeEnabled({ timeout: options?.timeout });
        } else {
            await expect(await recursiveLocatorLookup({
                page: this.page, selector, options: { ...options, state: 'visible' }, frameTree,
            })).toBeDisabled({ timeout: options?.timeout });
        }
        return Promise.resolve(true);
    }

    /**
     * Validate if the given element has the given text or not.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the locator to search for.
     * @param {string | RegExp} text the expected property of the selector that needs to be checked. either '' or 'disabled'.
     * @param {string} mode the expected property of the selector that needs to be checked. either 'positive' or 'negative'.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @returns {boolean} true if the element is have text/have not text as expected, false if the timeout was reached.
     */
    public async checkSelectorText(selector: Selector, text: string | RegExp | (string | RegExp)[], mode: CheckMode, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<boolean> {
        if (mode === 'positive') {
            await expect(await recursiveLocatorLookup({
                page: this.page, selector, options: { ...options, state: 'visible' }, frameTree,
            })).toHaveText(text, { timeout: options?.timeout });
        } else {
            await expect(await recursiveLocatorLookup({
                page: this.page, selector, options: { ...options, state: 'visible' }, frameTree,
            })).not.toHaveText(text, { timeout: options?.timeout });
        }
        return Promise.resolve(true);
    }

    /**
     * Validate if the given element has the given input value or not.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the locator to search for.
     * @param {string | RegExp} value the single value to check.
     * @param {CheckMode} mode the expected property of the selector that needs to be checked. either 'positive' or 'negative'.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @returns {boolean} true if the element is have value/have not value as expected, false if the timeout was reached.
     */
    public async checkSelectorValue(selector: Selector, value: string | RegExp, mode: CheckMode, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<boolean> {
        if (mode === 'positive') {
            await expect(await recursiveLocatorLookup({
                page: this.page, selector, options: { ...options, state: 'visible' }, frameTree,
            })).toHaveValue(value, { timeout: options?.timeout });
        } else {
            await expect(await recursiveLocatorLookup({
                page: this.page, selector, options: { ...options, state: 'visible' }, frameTree,
            })).not.toHaveValue(value, { timeout: options?.timeout });
        }
        return Promise.resolve(true);
    }

    /**
     * Validate if the given element has the given minimum count.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the selector of the element.
     * @param {number} count the minumum count of the element to be visible.
     * @param {CheckMode} mode the check mode - whether positive or negative
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @returns {boolean} true if the element has the given minimum count as expected, false if the timeout was reached.
     */
    public async checkMinCount(selector: Selector, count: number, mode: CheckMode, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<boolean> {
        await this.checkVisibilityState(`${selector} >> nth=${count - 1}`, mode, options, frameTree);
        return Promise.resolve(true);
    }

    /**
     * Validate if the given element has the given count.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the selector of the element.
     * @param {number} count the exact count of the element to be visible.
     * @param {CheckMode} mode the check mode - whether positive or negative
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @returns {boolean} true if the element has the given count as expected, false if the timeout was reached.
     */
    public async checkCount(selector: Selector, count: number, mode: CheckMode, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<boolean> {
        if (mode === 'positive') {
            await expect(await recursiveLocatorLookup({
                page: this.page, selector, options: { ...options, state: 'visible', evaluateVisible: false }, frameTree,
            })).toHaveCount(count, { timeout: options?.timeout });
        } else {
            await expect(await recursiveLocatorLookup({
                page: this.page, selector, options: { ...options, state: 'visible', evaluateVisible: false }, frameTree,
            })).not.toHaveCount(count, { timeout: options?.timeout });
        }
        return Promise.resolve(true);
    }

    /**
     * Counts screen elements which can be found via a selector.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the selector of the element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s) defining the location for the count.
     * @returns {boolean} Promise of number of counted elements
     */
    public async count(selector: Selector, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<number> {
        const counted = await (await recursiveLocatorLookup({
            page: this.page, selector, options: { ...options, state: 'visible', evaluateVisible: false }, frameTree,
        })).count();
        return Promise.resolve(counted);
    }

    /**
     * Validate if the given element is checked.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the selector of the element.
     * @param {CheckMode} mode the check mode - whether positive or negative
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @returns {boolean} true if the element is checked or not checked
     */
    public async checkChecked(selector: Selector, mode: CheckMode, options?: SelectorOptions, frameTree?: FrameSelector[]): Promise<boolean> {
        if (mode === 'positive') {
            await expect(await recursiveLocatorLookup({
                page: this.page, selector, options: { ...options, state: 'visible' }, frameTree,
            })).toBeChecked({ timeout: options?.timeout });
        } else {
            await expect(await recursiveLocatorLookup({
                page: this.page, selector, options: { ...options, state: 'visible' }, frameTree,
            })).not.toBeChecked({ timeout: options?.timeout });
        }
        return Promise.resolve(true);
    }

    /**
     * Get the cookies of the current browser context. If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs are returned.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @param {string|string[]} urls affected urls
     * @return {Cookie[]} Returns the cookies of the current browser context.
     */
    public async getCookies(urls?: string | string[] | undefined): Promise<Cookie[]> {
        return this.page.context().cookies(urls);
    }

    /**
     * Adds cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be obtained via BrowseTheWeb.getCookies([urls]).
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @param {Cookie[]} cookies Cookies to add at browser context
     * @return {void} Returns after adding cookies into this browser context.
     */
    public async addCookies(cookies: Cookie[]): Promise<void> {
        return this.page.context().addCookies(cookies);
    }

    /**
     * Clear the browser context cookies.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @return {void} Clears context cookies.
     */
    public async clearCookies(): Promise<void> {
        return this.page.context().clearCookies();
    }

    /**
     * Get a local storage item.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @param {string} key the key that specifies the item.
     * @return {any} Returns the local storage item
     */
    public async getLocalStorageItem(key: string): Promise<any> {
        return this.page.evaluate((k) => {
            const value = localStorage.getItem(k);
            if (value) {
                return Promise.resolve(JSON.parse(value));
            }
            return Promise.resolve(undefined);
        }, key);
    }

    /**
     * Set a local storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @param {string} key the key that specifies the item.
     * @param {any} value the value to set.
     * @return {void} Returns after adding the local storage item
     */
    public async setLocalStorageItem(key: string, value: any): Promise<void> {
        return this.page.evaluate(({ k, v }) => {
            localStorage.setItem(k, JSON.stringify(v));
            return Promise.resolve();
        }, { k: key, v: value });
    }

    /**
     * Delete a local storage item, if a key/value pair with the given key exists.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @param {string} key the key that specifies the item.
     * @return {void} Returns after deleting a local storage item
     */
    public async removeLocalStorageItem(key: string): Promise<void> {
        return this.page.evaluate((k) => {
            localStorage.removeItem(k);
            return Promise.resolve();
        }, key);
    }

    /**
     * Get a session storage item.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @param {string} key the key that specifies the item.
     * @return {any} Retrieves a session storage item
     */
    public async getSessionStorageItem(key: string): Promise<any> {
        return this.page.evaluate((k) => {
            const value = sessionStorage.getItem(k);
            if (value) {
                return Promise.resolve(JSON.parse(value));
            }
            return Promise.resolve(undefined);
        }, key);
    }

    /**
     * Set a session storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @param {string} key the key that specifies the item.
     * @param {any} value the value to set.
     * @return {void} Set the session storage item
     */
    public async setSessionStorageItem(key: string, value: any): Promise<void> {
        return this.page.evaluate(({ k, v }) => {
            sessionStorage.setItem(k, JSON.stringify(v));
            return Promise.resolve();
        }, { k: key, v: value });
    }

    /**
     * Delete a session storage item, if a key/value pair with the given key exists.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @param {string} key the key that specifies the item.
     * @return {void} Returns after removing a session storage item.
     */
    public async removeSessionStorageItem(key: string): Promise<void> {
        return this.page.evaluate((k) => {
            sessionStorage.removeItem(k);
            return Promise.resolve();
        }, key);
    }

    /**
     * Set the value of a Selector of type select to the given option.
     *
     * @deprecated Please use resolveSelectorToLocator instead to get access to a resoved Playwright Locator to build a custom implementation upon it.
     *
     * @param {Selector} selector the string representing the (select) selector.
     * @param {string} option the label of the option.
     * @param {SelectorOptions} selectorOptions (optional): advanced selector lookup options.
     * @param {FrameSelector[]} [frameTree] - An array of frame selector(s).
     * @return {any} Returns the array of option values that have been successfully selected.
     */
    public async selectOption(selector: Selector, option: string | { value?: string, label?: string, index?: number }, selectorOptions?: SelectorOptions, frameTree?: FrameSelector[]): Promise<any> {
        return (await recursiveLocatorLookup({
            page: this.page, selector, options: selectorOptions, frameTree,
        })).selectOption(option);
    }

    /**
     * Get a single screen element or list of screen elements.
     *
     * @deprecated Please use getPage instead to get access to Playwright page object to build a custom implementation upon it.
     *
     * @param {Selector} selector the string or locator representing the selector.
     * @param {boolean} singular (optional): the indicator whether to return a single item or a list of items. In case of single item the first item is returned if more than 1 items are found. Defaults to true.
     * @param {SelectorOptions} options (optional): advanced selector lookup options.
     * @returns {Locator | Locator[]} A single screen element or a list of screen elements depending on the singular input parameter.
     */
    public async getElement(selector: Selector, singular = true, selectorOptions: SelectorOptions = {}): Promise<Locator | Locator[]> {
        let locators;
        if (typeof selector === 'string') {
            await this.page.waitForSelector(selector, { timeout: selectorOptions?.timeout });
            locators = await this.page.locator(selector, { hasText: selectorOptions?.hasText });
        } else {
            locators = selector;
        }
        return singular ? locators?.first() : locators?.all();
    }
}
