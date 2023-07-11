import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Selector, SelectorOptions } from '../types';

/**
 * Action Class. Count elements.
 */
export class Count extends Action {
    private selector: Selector;

    private options?: SelectorOptions;

    private constructor(selector: Selector, options?: SelectorOptions) {
        super();

        this.selector = selector;
        this.options = options;
    }

    /**
     * wait for either a specified loading state or for a selector to become visible/active.
     *
     * @param {Actor} actor Actor performing this action
     * @return {any} Clears context cookies
     */
    // eslint-disable-next-line class-methods-use-this
    public performAs(actor: Actor): Promise<number> {
        return BrowseTheWeb.as(actor).count(this.selector, this.options);
    }

    /**
     * Count all elements for a given selector
     * @return {Count} new Count instance
     */
    public static elements(selector: Selector, options?: SelectorOptions): Count {
        return new Count(selector, options);
    }
}
