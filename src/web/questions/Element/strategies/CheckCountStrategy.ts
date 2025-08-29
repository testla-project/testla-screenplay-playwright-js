import { expect } from "@playwright/test";
import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { ExecuteParams } from "../types";
import { Selector, SelectorOptions } from "../../../types";

type DesiredCount = number;

export class CheckCountStrategy {
    private selector: Selector;

    private desiredCount: DesiredCount;

    private options?: SelectorOptions;

    constructor(selector: Selector, desiredCount: DesiredCount, options?: SelectorOptions) {
        this.selector = selector;
        this.desiredCount = desiredCount;
        this.options = options;
    }

    public async execute({ actor, abilityAlias, frameTree, checkMode }: ExecuteParams): Promise<void> {
        const { selector, options, desiredCount } = this;
        const locator = await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(selector, { ...options, evaluateVisible: false }, frameTree);

        if (checkMode === 'positive') {
            await expect(locator).toHaveCount(desiredCount, { timeout: options?.timeout });
        } else {
            await expect(locator).not.toHaveCount(desiredCount, { timeout: options?.timeout });
        }
    }
}