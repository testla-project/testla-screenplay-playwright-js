import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Activity Class. Press the specified key on the keyboard.
 */
export class Keyboard extends Action {
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
     * @param input the key(s) to press.
     */
    public static press(input: string): Keyboard {
        return new Keyboard(input);
    }
}
