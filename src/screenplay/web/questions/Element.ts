import { Actor, Question } from '@testla/screenplay';
import { expect } from '@playwright/test';
import { SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class Element extends Question<boolean> {
    // if true -> Element.not was called, answeredBy has to check for opposite
    private static checkMode: 'is' | 'not';

    private constructor(private mode: 'visible' | 'enabled', private selector: string, private options?: SelectorOptions & { wait?: boolean }) {
        super();
        this.mode = mode;
    }

    public async answeredBy(actor: Actor): Promise<boolean> {
        if (this.mode === 'visible') {
            if (Element.checkMode === 'is') {
                // .is was called -> perform positive check
                expect(await BrowseTheWeb.as(actor).isVisible(this.selector, this.options)).toBe(true);
                return true; // have to return something, if the question fails there will be an exception anyways
            }
            if (Element.checkMode === 'not') {
                // .not was called -> perform negtive check
                expect(await BrowseTheWeb.as(actor).isVisible(this.selector, this.options)).toBe(false);
                return true; // have to return something, if the question fails there will be an exception anyways
            }
        } if (this.mode === 'enabled') {
            if (Element.checkMode === 'is') {
                // .is was called -> perform positive check
                expect(await BrowseTheWeb.as(actor).isEnabled(this.selector, this.options)).toBe(true);
                return true;
            }
            if (Element.checkMode === 'not') {
                // .not was called -> perform negtive check
                expect(await BrowseTheWeb.as(actor).isEnabled(this.selector, this.options)).toBe(false);
                return true;
            }
        }
        throw new Error('Unknown mode: Element.answeredBy');
    }

    /**
     * make the Question check for the positive.
     */
    static get is() {
        Element.checkMode = 'is';
        return Element;
    }

    /**
     * make the Question check for the negative.
     */
    static get not() {
        Element.checkMode = 'not';
        return Element;
    }

    /**
     * Verifies if an element is visible.
     *
     * @param selector the selector
     * @param options (optional) advanced selector lookup options.
     */
    static isVisible(selector: string, options?: SelectorOptions & { wait?: boolean }): Element {
        const newOptions = { ...options };
        delete newOptions.wait;

        // it is possible to expect an instant availability -> for that the option wait must explicitely set to false
        // the default to 1ms is a defacto instant
        if (options?.wait === false) { newOptions.timeout = 1; }

        return new Element('visible', selector, newOptions);
    }

    /**
     * Verifies if an element is enabled.
     *
     * @param selector the selector
     * @param options (optional) advanced selector lookup options.
     */
    static isEnabled(selector: string, options?: SelectorOptions): Element {
        return new Element('enabled', selector, options);
    }
}
