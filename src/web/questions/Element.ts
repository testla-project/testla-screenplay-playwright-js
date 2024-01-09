import { Actor } from '@testla/screenplay';
import { expect } from '@playwright/test';
import { Selector, SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { CheckMode } from '../../types';
import { FrameEnabledQuestion } from '../templates/FrameEnabledQuestion';

type Mode = 'visible' | 'enabled' | 'text' | 'value' | 'count' | 'minCount' | 'checked';

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class Element extends FrameEnabledQuestion {
    private mode: Mode = 'visible';

    // the selector of the element to check.
    private selector: Selector = '';

    // text or value to check.
    private payload: number | string | RegExp | (string | RegExp)[] = '';

    // optional selector options.
    private options?: SelectorOptions;

    private constructor(private checkMode: CheckMode) {
        super();
    }

    /**
     * Verifies if an element.
     *
     * @param {Actor} actor the actor
     * @return {boolean} if .is was called -> positive check, if .not was called -> negative check
     */
    public async answeredBy(actor: Actor): Promise<boolean> {
        const {
            mode, selector, payload, checkMode, options, frameTree,
        } = this;

        if (mode === 'visible') {
            const locator = await BrowseTheWeb.as(actor).resolveSelectorToLocator(selector, { ...options, state: checkMode === 'positive' ? 'visible' : 'hidden' }, frameTree);

            if (this.checkMode === 'positive') {
                await expect(locator).toBeVisible({ timeout: options?.timeout });
            } else {
                await expect(locator).toBeHidden({ timeout: options?.timeout });
            }

            return Promise.resolve(true); // if the ability method is not the expected result there will be an exception
        }
        if (mode === 'enabled') {
            const locator = await BrowseTheWeb.as(actor).resolveSelectorToLocator(selector, options, frameTree);

            if (this.checkMode === 'positive') {
                await expect(locator).toBeEnabled({ timeout: options?.timeout });
            } else {
                await expect(locator).toBeDisabled({ timeout: options?.timeout });
            }
            return Promise.resolve(true); // if the ability method is not the expected result there will be an exception
        }
        if (mode === 'text') {
            const locator = await BrowseTheWeb.as(actor).resolveSelectorToLocator(selector, options, frameTree);

            if (this.checkMode === 'positive') {
                await expect(locator).toHaveText(payload as string, { timeout: options?.timeout });
            } else {
                await expect(locator).not.toHaveText(payload as string, { timeout: options?.timeout });
            }
            return Promise.resolve(true); // if the ability method is not the expected result there will be an exception
        }
        if (mode === 'value') {
            const locator = await BrowseTheWeb.as(actor).resolveSelectorToLocator(selector, options, frameTree);

            if (this.checkMode === 'positive') {
                await expect(locator).toHaveValue(payload as string | RegExp, { timeout: options?.timeout });
            } else {
                await expect(locator).not.toHaveValue(payload as string | RegExp, { timeout: options?.timeout });
            }
            return Promise.resolve(true); // if the ability method is not the expected result there will be an exception
        }
        if (mode === 'checked') {
            const locator = await BrowseTheWeb.as(actor).resolveSelectorToLocator(selector, options, frameTree);

            if (this.checkMode === 'positive') {
                await expect(locator).toBeChecked({ timeout: options?.timeout });
            } else {
                await expect(locator).not.toBeChecked({ timeout: options?.timeout });
            }
            return Promise.resolve(true); // if the ability method is not the expected result there will be an exception
        }
        if (mode === 'count') {
            const locator = await BrowseTheWeb.as(actor).resolveSelectorToLocator(selector, { ...options, evaluateVisible: false }, frameTree);

            if (this.checkMode === 'positive') {
                await expect(locator).toHaveCount(payload as number, { timeout: options?.timeout });
            } else {
                await expect(locator).not.toHaveCount(payload as number, { timeout: options?.timeout });
            }
            return Promise.resolve(true); // if the ability method is not the expected result there will be an exception
        }
        if (mode === 'minCount') {
            if (checkMode === 'positive') {
                await BrowseTheWeb.as(actor).resolveSelectorToLocator(`${selector} >> nth=${payload as number - 1}`, options, frameTree);
            } else {
                await BrowseTheWeb.as(actor).resolveSelectorToLocator(`${selector} >> nth=${payload as number - 1}`, { ...options, state: 'hidden' }, frameTree);
            }

            return Promise.resolve(true);
            // if the ability method is not the expected result there will be an exception
        }
        throw new Error('Unknown mode: Element.answeredBy');
    }

    /**
     * make the Question check for the positive.
     * @return {Element} new Element instance
     */
    static get toBe() {
        return new Element('positive');
    }

    /**
     * make the Question check for the negative.
     * @return {Element} new Element instance
     */
    static get notToBe() {
        return new Element('negative');
    }

    /**
     * make the Question check for the positive.
     * @return {Element} new Element instance
     */
    static get toHave() {
        return new Element('positive');
    }

    /**
     * make the Question check for the negative.
     * @return {Element} new Element instance
     */
    static get notToHave() {
        return new Element('negative');
    }

    /**
     * Verifies if an element is visible.
     *
     * @param {Selector} selector the selector
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Element} this Element instance
     */
    public visible(selector: Selector, options?: SelectorOptions): Element {
        this.mode = 'visible';
        this.selector = selector;
        this.options = options;

        return this;
    }

    /**
     * Verifies if an element is enabled.
     *
     * @param {Selector} selector the selector
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Element} this Element instance
     */
    public enabled(selector: Selector, options?: SelectorOptions): Element {
        this.mode = 'enabled';
        this.selector = selector;
        this.options = options;

        return this;
    }

    /**
     * Verifies if an element has the given text.
     *
     * @param selector the selector.
     * @param text the text to check.
     * @param options (optional) advanced selector lookup options.
     */
    public text(selector: Selector, text: string | RegExp | (string | RegExp)[], options?: SelectorOptions): Element {
        this.mode = 'text';
        this.selector = selector;
        this.payload = text;
        this.options = options;

        return this;
    }

    /**
     * Verifies if an element has the given value.
     *
     * @param selector the selector.
     * @param value the value to check.
     * @param options (optional) advanced selector lookup options.
     */
    public value(selector: Selector, value: string | RegExp, options?: SelectorOptions): Element {
        this.mode = 'value';
        this.selector = selector;
        this.payload = value;
        this.options = options;

        return this;
    }

    /**
     * Verifies if an element has a minimum count.
     *
     * @param {Selector} selector the selector
     * @param {number} minimumCount the minimum count.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Element} this Element instance
     */
    public minCount(selector: Selector, minimumCount: number, options?: SelectorOptions): Element {
        this.payload = minimumCount;
        this.mode = 'minCount';
        this.selector = selector;
        this.options = options;

        return this;
    }

    /**
     * Verifies if an element has a desired count.
     *
     * @param {Selector} selector the selector
     * @param {number} desiredCount the desired count.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Element} this Element instance
     */
    public count(selector: Selector, desiredCount: number, options?: SelectorOptions): Element {
        this.payload = desiredCount;
        this.selector = selector;
        this.mode = 'count';
        this.options = options;

        return this;
    }

    /**
     * Verifies if an element is checked.
     *
     * @param {Selector} selector the selector
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Element} this Element instance
     */
    public checked(selector: Selector, options?: SelectorOptions): Element {
        this.selector = selector;
        this.mode = 'checked';
        this.options = options;

        return this;
    }
}
