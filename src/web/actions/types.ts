import { Actor } from "@testla/screenplay";

export type ActionStrategyExecuteParams = {
    actor: Actor;
    abilityAlias?: string;
    frameTree?: string[];
};