import { Action, Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. DragAndDrop an element specified by a selector string and drop it on an element specified by another
 * selector string.
 */
export class DragAndDrop extends Action {
    private constructor(private sourceSelector: Selector, private targetSelector: Selector, private options?: {
        source?: SelectorOptions;
        target?: SelectorOptions;
    }) {
        super();
    }

    /**
     * drag the specified selector and drop it on the target.
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns after dragging the locator to another target locator or target position
     */
    public performAs(actor: Actor): Promise<void> {
        return BrowseTheWeb.as(actor, this.abilityAlias).dragAndDrop(this.sourceSelector, this.targetSelector, this.options);
    }

    /**
     * Drag the specified source element to the specified target element and drop it.
     *
     * @param {Selector} sourceSelector the selector of the source element.
     * @param {Selector} targetSelector the selector of the target element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {DragAndDrop} new DragAndDrop instance
     */
    public static execute(sourceSelector: Selector, targetSelector: Selector, options?: {
        source?: SelectorOptions;
        target?: SelectorOptions;
    }): DragAndDrop {
        return new DragAndDrop(sourceSelector, targetSelector, options);
    }
}
