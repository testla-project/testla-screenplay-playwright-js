import { Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Selector, SelectorOptions } from '../types';
import { FrameEnabledAction } from '../templates/FrameEnabledAction';

/**
 * Action Class. Count elements.
 */
export class Count extends FrameEnabledAction {
    private selector: Selector;

    private options?: SelectorOptions;

    private constructor(selector: Selector, options?: SelectorOptions) {
        super();

        this.selector = selector;
        this.options = options;
    }

    /**
     * Counts the number of elements satisfying the given Selector.
     *
     * @param {Actor} actor Actor performing this action
     * @return {any} Clears context cookies
     */
    // eslint-disable-next-line class-methods-use-this
    public async performAs(actor: Actor): Promise<number> {
        const {
            abilityAlias, selector, options, frameTree,
        } = this;
        const locator = await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(selector, { ...options, evaluateVisible: false }, frameTree);
        return locator.count();
    }

    /**
     * Count all elements for a given selector
     * @return {Count} new Count instance
     */
    public static elements(selector: Selector, options?: SelectorOptions): Count {
        return new Count(selector, options);
    }
}
