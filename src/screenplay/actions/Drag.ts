import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Activity Class. Drag an element specified by a selector string and drop it on an element specified by another
 * selector string.
 */
export class Drag extends Action {
    private constructor(private sourceSelector: string, private targetSelector: string) {
        super();
    }

    /**
     * drag the specified selector and drop it on the target.
     */
    public performAs(actor: Actor): Promise<void> {
        return BrowseTheWeb.as(actor).dragAndDrop(this.sourceSelector, this.targetSelector);
    }

    /**
     * Drag the specified source element to the specified target element and drop it.
     *
     * @param sourceSelector the selector of the source element.
     * @param targetSelector the selector of the target element.
     */
    public static andDrop(sourceSelector: string, targetSelector: string): Drag {
        return new Drag(sourceSelector, targetSelector);
    }
}
