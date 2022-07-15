import { Actor, Question } from '@testla/screenplay';
import { SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class Element extends Question<boolean> {
    private mode: 'visible' | 'enabled' = 'visible';

    // the selector of the element to check.
    private selector = '';

    // optional selector options.
    private options?: SelectorOptions & { wait?: boolean };

    // optional timeout to wait.
    private timeout?: number;

    private constructor(private checkMode: 'toBe' | 'notToBe') {
        super();
    }

    public async answeredBy(actor: Actor): Promise<boolean> {
        if (this.mode === 'visible') {
            // if .is was called -> positive check, if .not was called -> negative check
            return Promise.resolve(
                await BrowseTheWeb.as(actor).checkVisibilityState(this.checkMode === 'toBe' ? 'visible' : 'hidden', this.selector, this.options, this.timeout),
            ); // if the ability method is not the expected result there will be an exception
        }
        if (this.mode === 'enabled') {
            // if .is was called -> positive check, if .not was called -> negative check
            return Promise.resolve(
                await BrowseTheWeb.as(actor).checkEnabledState(this.checkMode === 'toBe' ? 'enabled' : 'disabled', this.selector, this.options, this.timeout),
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
    public visible(selector: string, options?: SelectorOptions & { timeout?: number }): Element {
        this.mode = 'visible';
        this.selector = selector;
        this.options = options;
        this.timeout = options?.timeout;

        return this;
    }

    /**
     * Verifies if an element is enabled.
     *
     * @param selector the selector
     * @param options (optional) advanced selector lookup options.
     */
    public enabled(selector: string, options?: SelectorOptions & { timeout?: number }): Element {
        this.mode = 'enabled';
        this.selector = selector;
        this.options = options;
        this.timeout = options?.timeout;

        return this;
    }
}
