import { Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Selector, SelectorOptions } from '../types';
import { FrameEnabledAction } from '../templates/FrameEnabledAction';
/**
 * Action Class. Set the value of a Selector of type select to the given option.
 */
export class Select extends FrameEnabledAction {
    private constructor(private selector: Selector, private option: string | { value?: string, label?: string, index?: number }, private selectorOptions?: SelectorOptions) {
        super();
    }

    /**
     * find the specified selector and click on it.
     *
     * @param {Actor} actor Actor performing this action
     * @return {any} This method checks, waits until all specified options are present in the `<select>` element and selects these options.
     */
    public async performAs(actor: Actor): Promise<any> {
        await BrowseTheWeb.as(actor, this.abilityAlias).selectOption(this.selector, this.option, this.selectorOptions, this.frameTree);
    }

    /**
     * Set the value of a Selector of type select to the given option.
     *
     * @param {Selector} selector the string representing the (select) selector.
     * @param {string|number} option optionLabel the label of the option.
     * @param {SelectorOptions} selectorOptions (optional): advanced selector lookup options.
     * @return {Select} new Select instance
     */
    public static option(selector: Selector, option: string | { value?: string, label?: string, index?: number }, selectorOptions?: SelectorOptions): Select {
        return new Select(selector, option, selectorOptions);
    }
}
