import { Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { FrameEnabledAction } from '../templates/FrameEnabledAction';

/**
 * Action Class. Click on an element specified by a selector string.
 */
export class Click extends FrameEnabledAction {
    private constructor(private selector: Selector, private options?: SelectorOptions) {
        super();
    }

    /**
     * find the specified selector and click on it.
     *
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns after clicking the element
     */
    public async performAs(actor: Actor): Promise<void> {
        await BrowseTheWeb.as(actor, this.abilityAlias).click(this.selector, this.options, this.frameTree);
    }

    /**
     * specify which element should be clicked on
     *
     * @param {Selector} selector the string representing the selector.
     * @param {SelectorOptions} options (optional): advanced selector lookup options.
     * @return {Click} new Click instance
     */
    public static on(selector: Selector, options?: SelectorOptions): Click {
        return new Click(selector, options);
    }
}
