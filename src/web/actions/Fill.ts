import { Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { FrameEnabledAction } from '../templates/FrameEnabledAction';

/**
 * Action Class. Fill an element specified by a selector string with the specified input.
 */
export class Fill extends FrameEnabledAction {
    private constructor(private selector: Selector, private input: string, private options?: SelectorOptions) {
        super();
    }

    /**
     * find the specified selector and fill it.
     *
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns after checks, focuses the element, fills it and triggers an `input` event after filling.
     */
    public async performAs(actor: Actor): Promise<void> {
        return BrowseTheWeb.as(actor, this.abilityAlias).fill(this.selector, this.input, this.options, this.frameTree);
    }

    /**
     * Finds the specified selector and will it with the specified input string.
     *
     * @param {Selector} selector the selector.
     * @param {string} input the input.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Fill} new Fill instance
     */
    public static in(selector: Selector, input: string, options?: SelectorOptions): Fill {
        return new Fill(selector, input, options);
    }
}
