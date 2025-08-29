import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { ExecuteParams } from "../types";
import { Selector, SelectorOptions } from "../../../types";

type MinimumCount = number;

export class CheckMinCountStrategy {
    private selector: Selector;

    private minimumCount: MinimumCount;

    private options?: SelectorOptions;

    constructor(selector: Selector, minimumCount: MinimumCount, options?: SelectorOptions) {
        this.selector = selector;
        this.minimumCount = minimumCount;
        this.options = options;
    }

    public async execute({ actor, abilityAlias, frameTree, checkMode }: ExecuteParams): Promise<void> {
        const { selector, options, minimumCount } = this;
        if (checkMode === 'positive') {
            await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(`${selector} >> nth=${minimumCount - 1}`, options, frameTree);
        } else {
            await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(`${selector} >> nth=${minimumCount - 1}`, { ...options, state: 'hidden' }, frameTree);
        }
    }
}