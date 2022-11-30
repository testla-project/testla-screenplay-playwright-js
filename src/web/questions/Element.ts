import { Actor, Question } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class Element extends Question<boolean> {
    private mode: 'visible' | 'enabled' = 'visible';

    // the selector of the element to check.
    private selector: Selector = '';

    // optional selector options.
    private options?: SelectorOptions;

    private constructor(private checkMode: 'toBe' | 'notToBe') {
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
        throw new Error('Unknown mode: Element.answeredBy');
    }

    /**
     * make the Question check for the positive.
     * @return {Element} new Element instance
     */
    static get toBe() {
        return new Element('toBe');
    }

    /**
     * make the Question check for the negative.
     * @return {Element} new Element instance
     */
    static get notToBe() {
        return new Element('notToBe');
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
}
