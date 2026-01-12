import { expect } from "@playwright/test";
import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { ExecuteParams } from "../types";
import { Selector, SelectorOptions } from "../../../types";

type AttributeValue = string | RegExp;

export class CheckAttributeValueStrategy {
    private selector: Selector;

    private attribute: string;

    private value: AttributeValue;

    private options?: SelectorOptions;

    constructor(selector: Selector, attribute: string, value: AttributeValue, options?: SelectorOptions) {
        this.selector = selector;
        this.attribute = attribute;
        this.value = value;
        this.options = options;
    }

    public async execute({ actor, abilityAlias, frameTree, checkMode }: ExecuteParams): Promise<void> {
        const { selector, options, attribute, value } = this;
        const locator = await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(selector, options, frameTree);

        if (checkMode === 'positive') {
            await expect(locator).toHaveAttribute(attribute, value, { timeout: options?.timeout });
        } else {
            await expect(locator).not.toHaveAttribute(attribute, value, { timeout: options?.timeout });
        }
    }
}
