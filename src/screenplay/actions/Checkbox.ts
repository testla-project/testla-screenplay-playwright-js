import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Activity Class. Click on an element specified by a selector string.
 */
export class Checkbox extends Action {
    private constructor(private selector: string, private hasText?: string, private subselector?: string) {
        super();
    }

    /**
     * find the specified selector and click on it.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<void> {
        if (this.hasText !== undefined) {
            await (await (BrowseTheWeb.as(actor) as BrowseTheWeb)
                .findSubselector(this.selector, this.hasText, this.subselector))
                .check();
        } else {
            await (BrowseTheWeb.as(actor) as BrowseTheWeb).checkBox(this.selector);
        }
    }

    /**
     * specify which element should be clicked on
     *
     * @param selector the string representing the selector.
     * @param hasText (optional): the text the subselector should have.
     * @param subselector (optional): the subselector.
     */
    public static check(selector: string, hasText?: string, subselector?: string): Checkbox {
        return new Checkbox(selector, hasText, subselector);
    }
}
