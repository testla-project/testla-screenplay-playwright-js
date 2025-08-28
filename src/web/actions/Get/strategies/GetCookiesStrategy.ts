import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { Cookie } from "@playwright/test";
import { ActionStrategyExecuteParams } from "../../types";

type Urls = string | string[] | undefined;

export class GetCookiesStrategy {
    protected urls: Urls;

    constructor(urls: Urls) {
        this.urls = urls;
    }

    public async execute({ actor, abilityAlias }: ActionStrategyExecuteParams): Promise<Cookie[]> {
        const page = BrowseTheWeb.as(actor, abilityAlias).getPage();
        return page.context().cookies(this.urls);
    }
}