import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Press the specified key on the keyboard.
 */
export class Press extends Action {
    private constructor(private input: string) {
        super();
    }

    /**
     * Press the specified key.
     *
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns when the `key` can specify the intended value or a single character to generate the text for.
     */
    public async performAs(actor: Actor): Promise<void> {
        return BrowseTheWeb.as(actor).press(this.input);
    }

    /**
     * Press a key on the keyboard. (or multiple keys with +, e.g. Shift+A)
     *
     * @param {string} keys the key(s) to press.
     * @return {Press} new Press instance
     */
    public static key(keys: string): Press {
        return new Press(keys);
    }
}
