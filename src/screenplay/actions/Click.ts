import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Activity Class. Click on an element specified by a selector string.
 */
export class Click extends Action {
    private constructor(private selector: string, private hasText?: string, private subselector?: string) {
        super();
    }

    /**
     * find the specified selector and click on it.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<void> {
        // Why do we use the hasText identification to define that we are looking for a subselector?
        // It should be the subselector identification.

        // if (this.hasText !== undefined) {
        //     await (await (BrowseTheWeb.as(actor) as BrowseTheWeb)
        //         .findSubselector(this.selector, this.hasText, this.subselector))
        //         .click();
        // } else {
        //     await BrowseTheWeb.as(actor).click(this.selector);
        // }

        if (this.hasText !== undefined && this.subselector !== undefined) {
            await BrowseTheWeb.as(actor).clickOnSubSelector(this.selector, this.hasText, this.subselector);
        } else {
            await BrowseTheWeb.as(actor).click(this.selector, this.hasText);
        }
    }

    /**
     * specify which element should be clicked on
     *
     * @param selector the string representing the selector.
     * @param hasText (optional): the text the subselector should have.
     * @param subselector (optional): the subselector.
     */
    public static on(selector: string, hasText?: string, subselector?: string): Click {
        return new Click(selector, hasText, subselector);
    }
}
