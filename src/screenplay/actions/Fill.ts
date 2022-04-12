import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Activity Class. Fill an element specified by a selector string with the specified input.
 */
export class Fill extends Action {
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
        return (BrowseTheWeb.as(actor) as BrowseTheWeb).fill(this.locator, this.input);
=======
        await (await (BrowseTheWeb.as(actor) as BrowseTheWeb)
            .findLocator(this.locator))
            .fill(this.input);
>>>>>>> 7aec5dcbb22fd87ccab980c4584ffc558ebdecf4
    }

    /**
     * Finds the specified selector and will it with the specified input string.
     *
     * @param selector the selector.
     * @param input the input.
     */
<<<<<<< HEAD
    public static in(selector: string, input: string): Fill {
=======
    public static with(selector: string, input: string): Fill {
>>>>>>> 7aec5dcbb22fd87ccab980c4584ffc558ebdecf4
        return new Fill(selector, input);
    }
}
