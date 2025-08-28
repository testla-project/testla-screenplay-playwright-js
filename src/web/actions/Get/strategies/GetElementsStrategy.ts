import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { Locator } from "@playwright/test";
import { Selector, SelectorOptions } from "../../../types";
import { ExecuteParams } from "../types";

export class GetElementsStrategy {
    private selector: Selector;

    private options?: SelectorOptions;

    singular: boolean;

    constructor(selector: Selector, options?: SelectorOptions, singular = true) {
        this.selector = selector;
        this.options = options;
        this.singular = singular;
    }

    public async execute({ actor, abilityAlias, frameTree }: ExecuteParams): Promise<Locator | Locator[]> {
        const locator = (await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(this.selector, { ...this.options, evaluateVisible: false }, frameTree)).filter();
        return this.singular === false ? locator.all() : locator.first();
    }
}