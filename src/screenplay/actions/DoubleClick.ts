import { Action, Actor } from '@testla/screenplay';
import { SelectorOptions } from '../../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Activity Class. Click on an element specified by a selector string.
 */
export class DoubleClick extends Action {
    // eslint-disable-next-line no-useless-constructor
    private constructor(private selector: string, private options?: SelectorOptions) {
        super();
    }

    /**
     * find the specified selector and click on it.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<void> {
        await BrowseTheWeb.as(actor).dblclick(this.selector, this.options);
    }

    /**
     * specify which element should be clicked on
     *
     * @param selector the string representing the selector.
     * @param hasText (optional): the text the subselector should have.
     */
    public static on(selector: string, options?: SelectorOptions): DoubleClick {
        return new DoubleClick(selector, options);
    }
}
