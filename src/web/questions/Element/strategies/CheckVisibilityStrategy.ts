import { expect } from "@playwright/test";
import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { ExecuteParams } from "../types";
import { Selector, SelectorOptions } from "../../../types";


export class CheckVisibilityStrategy {
    private selector: Selector;

    private options?: SelectorOptions;

    constructor(selector: Selector, options?: SelectorOptions) {
        this.selector = selector;
        this.options = options;
    }

    public async execute({ actor, abilityAlias, frameTree, checkMode }: ExecuteParams): Promise<void> {
        const { selector, options } = this;
        const locator = await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(selector, { ...options, state: checkMode === 'positive' ? 'visible' : 'hidden' }, frameTree);

        if (checkMode === 'positive') {
            await expect(locator).toBeVisible({ timeout: options?.timeout });
        } else {
            await expect(locator).toBeHidden({ timeout: options?.timeout });
        }
    }
}