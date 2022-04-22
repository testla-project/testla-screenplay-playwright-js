import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Activity Class. Check a checkbox specified by a selector string.
 */
export class Check extends Action {
    private constructor(private selector: string) {
        super();
    }

    /**
     * find the specified selector and click on it.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<void> {
        await BrowseTheWeb.as(actor).checkBox(this.selector);
    }

    /**
     * specify which element should be clicked on
     *
     * @param selector the string representing the selector.
     * @param hasText (optional): the text the subselector should have.
     */
    public static element(selector: string): Check {
        return new Check(selector);
    }
}
