import { Actor } from "@testla/screenplay";

export type ExecuteParams = {
    actor: Actor;
    abilityAlias?: string;
    frameTree?: string[];
};