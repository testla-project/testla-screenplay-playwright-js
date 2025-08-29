import { expect } from "@playwright/test";
import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { ExecuteParams } from "../types";
import { Selector, SelectorOptions } from "../../../types";

type Text = string | RegExp | (string | RegExp)[];

export class CheckTextStrategy {
    private selector: Selector;

    private text: Text;

    private options?: SelectorOptions;

    constructor(selector: Selector, text: Text, options?: SelectorOptions) {
        this.selector = selector;
        this.text = text;
        this.options = options;
    }

    public async execute({ actor, abilityAlias, frameTree, checkMode }: ExecuteParams): Promise<void> {
        const { selector, options, text } = this;
        const locator = await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(selector, options, frameTree);

        if (checkMode === 'positive') {
            await expect(locator).toHaveText(text, { timeout: options?.timeout });
        } else {
            await expect(locator).not.toHaveText(text, { timeout: options?.timeout });
        }
    }
}