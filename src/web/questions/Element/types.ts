import { Actor } from "@testla/screenplay";
import { CheckMode } from "../../../types";

export type ExecuteParams = {
    actor: Actor;
    abilityAlias?: string;
    frameTree?: string[];
    checkMode: CheckMode;
};