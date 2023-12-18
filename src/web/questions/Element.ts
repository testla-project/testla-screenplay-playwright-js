import { Actor, Question } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { CheckMode } from '../../types';

type Mode = 'visible' | 'enabled' | 'text' | 'value' | 'count' | 'minCount' | 'checked';

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class Element extends Question<boolean> {
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
        if (this.mode === 'visible') {
            return Promise.resolve(
                await BrowseTheWeb.as(actor).checkVisibilityState(this.selector, this.checkMode, this.options),
            ); // if the ability method is not the expected result there will be an exception
        }
        if (this.mode === 'enabled') {
            return Promise.resolve(
                await BrowseTheWeb.as(actor).checkEnabledState(this.selector, this.checkMode, this.options),
            ); // if the ability method is not the expected result there will be an exception
        }
        if (this.mode === 'text') {
            return Promise.resolve(
                await BrowseTheWeb.as(actor).checkSelectorText(this.selector, this.payload as string, this.checkMode, this.options),
            ); // if the ability method is not the expected result there will be an exception
        }
        if (this.mode === 'value') {
            // Element.values was called -> need to check multiple values
            if (!Array.isArray(this.payload)) {
                return Promise.resolve(
                    await BrowseTheWeb.as(actor).checkSelectorValue(this.selector, this.payload as string, this.checkMode, this.options),
                ); // if the ability method is not the expected result there will be an exception
            }

            throw new Error('Element.value: incompatible payload! Arrays can not be checked.');
        }
        if (this.mode === 'checked') {
            return Promise.resolve(
                await BrowseTheWeb.as(actor).checkChecked(this.selector, this.checkMode, this.options),
            ); // if the ability method is not the expected result there will be an exception
        }
        if (this.mode === 'count') {
            return Promise.resolve(
                await BrowseTheWeb.as(actor).checkCount(this.selector, this.payload as number, this.checkMode, { ...this.options }),
            ); // if the ability method is not the expected result there will be an exception
        }
        if (this.mode === 'minCount') {
            return Promise.resolve(
                await BrowseTheWeb.as(actor).checkMinCount(this.selector, this.payload as number, this.checkMode, this.options),
            ); // if the ability method is not the expected result there will be an exception
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
