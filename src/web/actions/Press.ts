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
     * @param actor
     */
    public async performAs(actor: Actor): Promise<void> {
        return BrowseTheWeb.as(actor).press(this.input);
    }

    /**
     * Press a key on the keyboard. (or multiple keys with +, e.g. Shift+A)
     *
     * @param keys the key(s) to press.
     */
    public static key(keys: string): Press {
        return new Press(keys);
    }
}
