import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Remove from the Browser.
 */
export class Clear extends Action {
    /**
     * Clears all browser cookies.
     *
     * @param {Actor} actor Actor performing this action
     * @return {any} Clears context cookies
     */
    // eslint-disable-next-line class-methods-use-this
    public performAs(actor: Actor): Promise<void> {
        const page = BrowseTheWeb.as(actor, this.abilityAlias).getPage();
        return page.context().clearCookies();
    }

    /**
     * Clear all browser cookies.
     * @return {Clear} new Clear instance
     */
    public static cookies(): Clear {
        const instance = new Clear();
        instance.setCallStackInitializeCalledWith({});
        return instance;
    }
}
