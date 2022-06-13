import { Actor, Question } from '@testla/screenplay';
import { expect } from '@playwright/test';
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

    private constructor(private checkMode: 'is' | 'not') {
        super();
    }

    public async answeredBy(actor: Actor): Promise<boolean> {
        if (this.mode === 'visible') {
            // if .is was called -> positive check, if .not was called -> negative check
            expect(await BrowseTheWeb.as(actor).isVisible(this.selector, this.options)).toBe(this.checkMode === 'is');
            return true; // if the question fails there will be an exception
        }
        if (this.mode === 'enabled') {
            // if .is was called -> positive check, if .not was called -> negative check
            expect(await BrowseTheWeb.as(actor).isEnabled(this.selector, this.options)).toBe(this.checkMode === 'is');
            return true; // if the question fails there will be an exception
        }
        throw new Error('Unknown mode: Element.answeredBy');
    }

    /**
     * make the Question check for the positive.
     */
    static get is() {
        return new Element('is');
    }

    /**
     * make the Question check for the negative.
     */
    static get not() {
        return new Element('not');
    }

    /**
     * Verifies if an element is visible.
     *
     * @param selector the selector
     * @param options (optional) advanced selector lookup options.
     */
    public visible(selector: string, options?: SelectorOptions & { wait?: boolean }): Element {
        const newOptions = { ...options };
        delete newOptions.wait;

        // it is possible to expect an instant availability -> for that the option wait must explicitely set to false
        // the default to 1ms is a defacto instant
        if (options?.wait === false) { newOptions.timeout = 1; }

        this.mode = 'visible';
        this.selector = selector;
        this.options = newOptions;

        return this;
    }

    /**
     * Verifies if an element is enabled.
     *
     * @param selector the selector
     * @param options (optional) advanced selector lookup options.
     */
    public enabled(selector: string, options?: SelectorOptions): Element {
        this.mode = 'enabled';
        this.selector = selector;
        this.options = options;

        return this;
    }
}
