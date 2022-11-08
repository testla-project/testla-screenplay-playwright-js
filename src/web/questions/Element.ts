import { Actor, Question } from '@testla/screenplay';
import { SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class Element extends Question<boolean> {
    private mode: 'visible' | 'enabled' | 'text' | 'value' | 'values' = 'visible';

    // the selector of the element to check.
    private selector = '';

    // text or value to check.
    private payload: string | RegExp | (string | RegExp)[] = '';

    // optional selector options.
    private options?: SelectorOptions;

    private constructor(private checkMode: 'toBe' | 'notToBe') {
        super();
    }

    public async answeredBy(actor: Actor): Promise<boolean> {
        if (this.mode === 'visible') {
            // if .is was called -> positive check, if .not was called -> negative check
            return Promise.resolve(
                await BrowseTheWeb.as(actor).checkVisibilityState(this.selector, this.checkMode === 'toBe' ? 'visible' : 'hidden', this.options),
            ); // if the ability method is not the expected result there will be an exception
        }
        if (this.mode === 'enabled') {
            // if .is was called -> positive check, if .not was called -> negative check
            return Promise.resolve(
                await BrowseTheWeb.as(actor).checkEnabledState(this.selector, this.checkMode === 'toBe' ? 'enabled' : 'disabled', this.options),
            ); // if the ability method is not the expected result there will be an exception
        }
        if (this.mode === 'text') {
            // if .is was called -> positive check, if .not was called -> negative check
            return Promise.resolve(
                await BrowseTheWeb.as(actor).checkSelectorText(this.selector, this.payload, this.checkMode === 'toBe' ? 'has' : 'hasNot', this.options),
            ); // if the ability method is not the expected result there will be an exception
        }
        if (this.mode === 'value' || this.mode === 'values') {
            // Element.values was called -> need to check multiple values
            if (Array.isArray(this.payload)) {
                return Promise.resolve(
                    await BrowseTheWeb.as(actor).checkSelectorValues(this.selector, this.payload, this.checkMode === 'toBe' ? 'has' : 'hasNot', this.options),
                );
            }
            // Element.value was called -> need to check single values
            return Promise.resolve(
                await BrowseTheWeb.as(actor).checkSelectorValue(this.selector, this.payload, this.checkMode === 'toBe' ? 'has' : 'hasNot', this.options),
            ); // if the ability method is not the expected result there will be an exception
        }
        throw new Error('Unknown mode: Element.answeredBy');
    }

    /**
     * make the Question check for the positive.
     */
    static get toBe() {
        return new Element('toBe');
    }

    /**
     * make the Question check for the negative.
     */
    static get notToBe() {
        return new Element('notToBe');
    }

    /**
     * Verifies if an element is visible.
     *
     * @param selector the selector
     * @param options (optional) advanced selector lookup options.
     */
    public visible(selector: string, options?: SelectorOptions): Element {
        this.mode = 'visible';
        this.selector = selector;
        this.options = options;

        return this;
    }

    /**
     * Verifies if an element is enabled.
     *
     * @param selector the selector.
     * @param options (optional) advanced selector lookup options.
     */
    public enabled(selector: string, options?: SelectorOptions): Element {
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
    public text(selector: string, text: string | RegExp | (string | RegExp)[], options?: SelectorOptions): Element {
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
    public value(selector: string, value: string | RegExp, options?: SelectorOptions): Element {
        this.mode = 'value';
        this.selector = selector;
        this.payload = value;
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
    public values(selector: string, value: (string | RegExp)[], options?: SelectorOptions): Element {
        this.mode = 'values';
        this.selector = selector;
        this.payload = value;
        this.options = options;

        return this;
    }
}
