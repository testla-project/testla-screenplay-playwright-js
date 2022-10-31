import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { SelectorOptions } from '../types';

/**
 * Action Class. Set the value of a Selector of type select to the given option.
 */
export class Select extends Action {
    private constructor(private selector: string, private option: string | { value?: string, label?: string, index?: number }, private selectorOptions?: SelectorOptions) {
        super();
    }

    /**
     * find the specified selector and click on it.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<any> {
        await BrowseTheWeb.as(actor).selectOption(this.selector, this.option, this.selectorOptions);
    }

    /**
     * Set the value of a Selector of type select to the given option.
     *
     * @param selector the string representing the (select) selector.
     * @param optionLabel the label of the option.
     * @param selectorOptions (optional): advanced selector lookup options.
     */
    public static option(selector: string, option: string | { value?: string, label?: string, index?: number }, selectorOptions?: SelectorOptions): Select {
        return new Select(selector, option, selectorOptions);
    }
}
