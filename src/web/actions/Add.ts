import { Cookie } from '@playwright/test';
import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Add Cookies to the Browser.
 */
export class Add extends Action {
    private constructor(private cookies: Cookie[]) {
        super();
    }

    /**
     * add the cookies to the browser.
     *
     * @param {Actor} actor Actor performing this action
     */
    public performAs(actor: Actor): Promise<any> {
        return BrowseTheWeb.as(actor).addCookies(this.cookies);
    }

    /**
     * Add the specified cookies.
     *
     * @param cookies the cookies to add.
     */
    public static cookies(cookies: Cookie[]): Add {
        return new Add(cookies);
    }
}
