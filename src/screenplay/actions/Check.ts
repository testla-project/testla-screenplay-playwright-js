import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Activity Class. Check a checkbox specified by a selector string.
 */
export class Check extends Action {
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
            await BrowseTheWeb.as(actor).checkBox(this.selector);
        }
    }

    /**
     * specify which element should be clicked on
     *
     * @param selector the string representing the selector.
     * @param hasText (optional): the text the subselector should have.
     * @param subselector (optional): the subselector.
     */
    public static element(selector: string, hasText?: string, subselector?: string): Check {
        return new Check(selector, hasText, subselector);
    }
}
