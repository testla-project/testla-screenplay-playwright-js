import { Cookie } from '@playwright/test';
import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../../abilities/BrowseTheWeb';

/**
 * Action Class. Add Cookies to the Browser.
 */
export class Add extends Action {
    private cookies: Cookie[];

    private constructor(cookies: Cookie[]) {
        super();

        this.cookies = cookies;
    }

    /**
     * Add the cookies to the browser.
     *
     * @param {Actor} actor Actor performing this action
     * @return {any} Adds cookies into this browser context.
     */
    public performAs(actor: Actor): Promise<void> {
        const page = BrowseTheWeb.as(actor, this.abilityAlias).getPage();
        return page.context().addCookies(this.cookies);
    }

    /**
     * Add the specified cookies.
     *
     * @param {Cookie} cookies the cookies to add.
     * @return {Add} new Add instance
     */
    public static cookies(cookies: Cookie[]): Add {
        const instance = new Add(cookies);
        instance.setCallStackInitializeCalledWith({ cookies });
        return instance;
    }
}
