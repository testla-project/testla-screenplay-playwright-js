import { Actor, Question } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class Element extends Question<boolean> {
    private mode: 'visible' | 'enabled';

    private constructor(mode: 'visible' | 'enabled', private locator: string) {
        super();
        this.mode = mode;
    }

    public answeredBy(actor: Actor): Promise<boolean> {
        if (this.mode === 'visible') {
            return BrowseTheWeb.as(actor).isVisible(this.locator);
        } if (this.mode === 'enabled') {
            return BrowseTheWeb.as(actor).isEnabled(this.locator);
        }
        throw new Error('Unknown mode');
    }

    static isVisible(locator: string): Element {
        return new Element('visible', locator);
    }

    static isEnabled(locator: string): Element {
        return new Element('enabled', locator);
    }
}
