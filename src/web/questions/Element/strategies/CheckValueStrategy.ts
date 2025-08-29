import { expect } from "@playwright/test";
import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { ExecuteParams } from "../types";
import { Selector, SelectorOptions } from "../../../types";

type Value = string | RegExp;

export class CheckValueStrategy {
    private selector: Selector;

    private value: Value;

    private options?: SelectorOptions;

    constructor(selector: Selector, value: Value, options?: SelectorOptions) {
        this.selector = selector;
        this.value = value;
        this.options = options;
    }

    public async execute({ actor, abilityAlias, frameTree, checkMode }: ExecuteParams): Promise<void> {
        const { selector, options, value } = this;
        const locator = await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(selector, options, frameTree);

        if (checkMode === 'positive') {
            await expect(locator).toHaveValue(value, { timeout: options?.timeout });
        } else {
            await expect(locator).not.toHaveValue(value, { timeout: options?.timeout });
        }
    }
}