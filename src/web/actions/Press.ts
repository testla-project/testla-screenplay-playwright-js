import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Selector, SelectorOptions } from '../types';

/**
 * Action Class. Press the specified key on the keyboard.
 */
export class Press extends Action {
    private constructor(private mode: 'key' | 'sequentially', private payload: any) {
        super();
    }

    /**
     * Press the specified key.
     *
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns when the `key` can specify the intended value or a single character to generate the text for.
     */
    public async performAs(actor: Actor): Promise<void> {
        if (this.mode === 'key') {
            return BrowseTheWeb.as(actor).press(this.payload.keys);
        }
        return BrowseTheWeb.as(actor).pressSequentially(this.payload.selector, this.payload.input, this.payload.options);
    }

    /**
     * Press a key on the keyboard. (or multiple keys with +, e.g. Shift+A)
     *
     * @param {string} keys the key(s) to press.
     * @return {Press} new Press instance
     */
    public static key(keys: string): Press {
        return new Press('key', { keys });
    }

    /**
     * Types the given input into the element specified by the selector.
     * @param {Selector} selector The selector of the source element.
     * @param {string} input The input to type into the element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Press} new Press instance
     */
    public static sequentially(selector: Selector, input: string, options?: SelectorOptions): Press {
        return new Press('sequentially', { selector, input, options });
    }
}
