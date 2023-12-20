import { Action, Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Check a checkbox specified by a selector string.
 */
export class Check extends Action {
    private constructor(private selector: Selector, private options?: SelectorOptions) {
        super();
    }

    /**
     * find the specified selector and click on it.
     *
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns after checking the element
     */
    public async performAs(actor: Actor): Promise<void> {
        await BrowseTheWeb.as(actor, this.abilityAlias).checkBox(this.selector, this.options);
    }

    /**
     * specify which element should be clicked on
     *
     * @param {Selector} selector the string representing the selector.
     * @param {SelectorOptions} options (optional): advanced selector lookup options.
     * @return {Check} new Check instance
     */
    public static element(selector: Selector, options?: SelectorOptions): Check {
        return new Check(selector, options);
    }
}
