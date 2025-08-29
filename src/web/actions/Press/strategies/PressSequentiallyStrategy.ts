import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { Maskable, Selector, SelectorOptions } from "../../../types";
import { ActionStrategyExecuteParams } from "../../types";

export class PressSequentiallyStrategy {
    private selector: Selector;

    private input: string;
    
    private options?: SelectorOptions & Maskable;

    constructor(selector: Selector, input: string, options?: SelectorOptions) {
        this.selector = selector;
        this.input = input;
        this.options = options;
    }

    public async execute({ actor, abilityAlias, frameTree }: ActionStrategyExecuteParams): Promise<void> {
        const { selector, input, options } = this;
        const locator = await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(selector, options, frameTree);
        return locator.pressSequentially(input);
    }
}