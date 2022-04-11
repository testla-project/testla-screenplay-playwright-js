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
        await (await (BrowseTheWeb.as(actor) as BrowseTheWeb)
            .findLocator(this.locator))
            .type(this.input);
    }

    /**
     * Finds the specified selector and will it with the specified input string.
     *
     * @param selector the selector.
     * @param input the input.
     */
    public static into(selector: string, input: string): Type {
        return new Type(selector, input);
    }
}
