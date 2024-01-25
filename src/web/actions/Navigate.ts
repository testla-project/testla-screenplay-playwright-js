import { Action, Actor } from '@testla/screenplay';
import { Response } from '@playwright/test';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Navigate to a URL using the specified url string.
 */
export class Navigate extends Action {
    private url: string;

    private constructor(url: string) {
        super();

        this.url = url;
    }

    /**
     * navigate to the specified URL.
     *
     * @param {Actor} actor Actor performing this action
     * @return {any} Returns the main resource response.
     */
    public performAs(actor: Actor): Promise<null | Response> {
        const page = BrowseTheWeb.as(actor, this.abilityAlias).getPage();
        return page.goto(this.url);
    }

    /**
     * Use the page to navigate to a certain URL.
     *
     * @param {string} url the url which should be accessed.
     * @return {Navigate} new Navigate instance
     */
    public static to(url: string): Navigate {
        const instance = new Navigate(url);
        instance.setCallStackInitializeCalledWith({ url });
        return instance;
    }
}
