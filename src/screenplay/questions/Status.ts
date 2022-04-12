// eslint-disable-next-line max-classes-per-file
import { Actor, Question } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

class VisibleStatus extends Question<boolean> {
    public async answeredBy(actor: Actor): Promise<boolean> {
        return (await (BrowseTheWeb.as(actor) as BrowseTheWeb)
            .findLocator(this.locator)).isVisible();
    }

    // eslint-disable-next-line no-useless-constructor
    public constructor(private locator: string) {
        super();
    }

    public toString(): string {
        return `Status of element '${this.locator.toString()}'`;
    }
}
class EnableStatus extends Question<boolean> {
    public async answeredBy(actor: Actor): Promise<boolean> {
        return (await (BrowseTheWeb.as(actor) as BrowseTheWeb)
            .findLocator(this.locator)).isEnabled();
    }

    // eslint-disable-next-line no-useless-constructor
    public constructor(private locator: string) {
        super();
    }
}

export class Status {
    // is the specified locator visible?
    public static visible = {
        of: (locator: string): VisibleStatus => new VisibleStatus(locator),
    };

    // is the specified locator enabled?
    public static enable = {
        of: (locator: string): EnableStatus => new EnableStatus(locator),
    };
}
