import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { ActionStrategyExecuteParams } from "../../types";

export class PressKeyStrategy {
    private keys: string;

    constructor(keys: string) {
        this.keys = keys;
    }

    public async execute({ actor, abilityAlias }: ActionStrategyExecuteParams): Promise<void> {
        const page = BrowseTheWeb.as(actor, abilityAlias).getPage();
        return page.keyboard.press(this.keys);
    }
}