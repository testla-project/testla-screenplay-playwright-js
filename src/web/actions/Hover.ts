import { Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { FrameEnabledAction } from '../templates/FrameEnabledAction';

/**
 * Action Class. Hover over an element specified by a selector string.
 */
export class Hover extends FrameEnabledAction {
    private constructor(private selector: Selector, private options?: SelectorOptions & { modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[] }) {
        super();
    }

    /**
     * find the specified selector and hover over it.
     *
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns when hovered over the element
     */
    public performAs(actor: Actor): Promise<void> {
        return BrowseTheWeb.as(actor, this.abilityAlias).hover(this.selector, this.options, this.frameTree);
    }

    /**
     * Specify which selector should be hovered over
     *
     * @param {Selector} selector The selector that should be hovered over.
     * @param {SelectorOptions} options (optional) advanced selector lookup options + Modifier keys to press. Ensures that only these modifiers are pressed during the operation.
     * @return {Hover} new Hover instance
     */
    public static over(selector: Selector, options?: SelectorOptions & { modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[] }): Hover {
        return new Hover(selector, options);
    }
}
