import { Action, Actor } from '@testla/screenplay';
import { SelectorOptions } from '../../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Fill an element specified by a selector string with the specified input.
 */
export class Fill extends Action {
    private constructor(private locator: string, private input: string, private options?: SelectorOptions) {
        super();
    }

    /**
     * find the specified selector and fill it.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<void> {
        return BrowseTheWeb.as(actor).fill(this.locator, this.input, this.options);
    }

    /**
     * Finds the specified selector and will it with the specified input string.
     *
     * @param selector the selector.
     * @param input the input.
     * @param options (optional) advanced selector lookup options.
     */
    public static in(selector: string, input: string, options?: SelectorOptions): Fill {
        return new Fill(selector, input, options);
    }
}
