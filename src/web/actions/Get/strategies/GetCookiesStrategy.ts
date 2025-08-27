import { Actor } from "@testla/screenplay";
import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { Cookie } from "@playwright/test";

type Urls = string | string[] | undefined;

export class GetCookiesStrategy {
    protected urls: Urls;

    constructor(urls: Urls) {
        this.urls = urls;
    }

    public async performAs(actor: Actor, abilityAlias?: string): Promise<Cookie[]> {
        const page = BrowseTheWeb.as(actor, abilityAlias).getPage();
        return page.context().cookies(this.urls);
    }
}