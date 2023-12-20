import { Actor, Action } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class Reload extends Action {
    // eslint-disable-next-line
    public async performAs(actor: Actor): Promise<any> {
        return BrowseTheWeb.as(actor, this.abilityAlias).reload();
    }

    /**
     * Reload the current browser page.
     */
    public static page(): Reload {
        return new Reload();
    }
}
