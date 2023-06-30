import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Remove from the Browser.
 */
export class Clear extends Action {
    /**
     * wait for either a specified loading state or for a selector to become visible/active.
     *
     * @param {Actor} actor Actor performing this action
     * @return {any} Clears context cookies
     */
    // eslint-disable-next-line class-methods-use-this
    public performAs(actor: Actor): Promise<any> {
        return BrowseTheWeb.as(actor).clearCookies();
    }

    /**
     * Clear all browser cookies.
     * @return {Clear} new Clear instance
     */
    public static cookies(): Clear {
        return new Clear();
    }
}
