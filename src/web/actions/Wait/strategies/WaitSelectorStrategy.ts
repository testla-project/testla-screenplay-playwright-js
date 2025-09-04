import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { ActionStrategyExecuteParams } from "../../types";
import { Selector, SelectorOptions } from "../../../types";

export class WaitSelectorStrategy {
    private selector: Selector;
    
    private options?: SelectorOptions;

    constructor(selector: Selector, options?: SelectorOptions) {
        this.selector = selector;
        this.options = options;
    }

    public async execute({ actor, abilityAlias, frameTree }: ActionStrategyExecuteParams) {
        return BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(this.selector, this.options, frameTree);
    }
}
