import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Activity Class. Type specified input into an element specified by a selector string.
 */
export class Type extends Action {
    private constructor(private locator: string, private input: string) {
        super();
    }

    /**
     * find the specified selector and fill it.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<void> {
<<<<<<< HEAD
        return BrowseTheWeb.as(actor).type(this.locator, this.input);
=======
        await (await (BrowseTheWeb.as(actor) as BrowseTheWeb)
            .findLocator(this.locator))
            .type(this.input);
>>>>>>> 7aec5dcbb22fd87ccab980c4584ffc558ebdecf4
    }

    /**
     * Finds the specified selector and will it with the specified input string.
     *
     * @param selector the selector.
     * @param input the input.
     */
<<<<<<< HEAD
    public static in(selector: string, input: string): Type {
=======
    public static into(selector: string, input: string): Type {
>>>>>>> 7aec5dcbb22fd87ccab980c4584ffc558ebdecf4
        return new Type(selector, input);
    }
}
