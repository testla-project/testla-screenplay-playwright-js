import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { ActionPageCommand, ActionStrategyExecuteParams } from "../../types";

export class WaitPageCommandStrategy {
    private command: ActionPageCommand;

    constructor(command: ActionPageCommand) {
        this.command = command;
    }

    public async execute({ actor, abilityAlias }: ActionStrategyExecuteParams) {
        const page = BrowseTheWeb.as(actor, abilityAlias).getPage();
        // eslint-disable-next-line
        // @ts-ignore
        return page[this.command.method](...this.command.args);
        // this is not a problem since we ensure type safety when creating the command
    }
}