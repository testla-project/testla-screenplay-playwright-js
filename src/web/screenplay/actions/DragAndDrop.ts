import { Action, Actor } from '@testla/screenplay';
import { SelectorOptions } from '../../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. DragAndDrop an element specified by a selector string and drop it on an element specified by another
 * selector string.
 */
export class DragAndDrop extends Action {
    private constructor(private sourceSelector: string, private targetSelector: string, private options?: {
        source?: SelectorOptions;
        target?: SelectorOptions;
    }) {
        super();
    }

    /**
     * drag the specified selector and drop it on the target.
     */
    public performAs(actor: Actor): Promise<void> {
        return BrowseTheWeb.as(actor).dragAndDrop(this.sourceSelector, this.targetSelector, this.options);
    }

    /**
     * Drag the specified source element to the specified target element and drop it.
     *
     * @param sourceSelector the selector of the source element.
     * @param targetSelector the selector of the target element.
     * @param options (optional) advanced selector lookup options.
     */
    public static execute(sourceSelector: string, targetSelector: string, options?: {
        source?: SelectorOptions;
        target?: SelectorOptions;
    }): DragAndDrop {
        return new DragAndDrop(sourceSelector, targetSelector, options);
    }
}
