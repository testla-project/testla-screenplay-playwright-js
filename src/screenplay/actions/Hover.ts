import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Activity Class. Hover over an element specified by a selector string.
 */
export class Hover extends Action {
    private constructor(private selector: string, private modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[]) {
        super();
    }

    /**
     * find the specified selector and hover over it.
     *
     * @param actor
     */
    public performAs(actor: Actor): Promise<void> {
        return (BrowseTheWeb.as(actor) as BrowseTheWeb).hoverOver(this.selector, this.modifiers);
    }

    /**
     * Specify which selector should be hovered over
     *
     * @param selector The selector that should be hovered over.
     * @param modifiers Modifier keys to press. Ensures that only these modifiers are pressed during the operation.
     */
    public static over(selector: string, modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[]): Hover {
        return new Hover(selector, modifiers);
    }
}
