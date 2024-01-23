import { Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { FrameEnabledAction } from '../templates/FrameEnabledAction';

/**
 * Action Class. Hover over an element specified by a selector string.
 */
export class Hover extends FrameEnabledAction {
    private selector: Selector;

    private options?: SelectorOptions & { modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[] };

    private constructor(selector: Selector, options?: SelectorOptions & { modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[] }) {
        super();

        this.selector = selector;
        this.options = options;
    }

    /**
     * find the specified selector and hover over it.
     *
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns when hovered over the element
     */
    public async performAs(actor: Actor): Promise<void> {
        const {
            abilityAlias, selector, options, frameTree,
        } = this;
        const locator = await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(selector, options, frameTree);
        return locator.hover({ modifiers: options?.modifiers });
    }

    /**
     * Specify which selector should be hovered over
     *
     * @param {Selector} selector The selector that should be hovered over.
     * @param {SelectorOptions} options (optional) advanced selector lookup options + Modifier keys to press. Ensures that only these modifiers are pressed during the operation.
     * @return {Hover} new Hover instance
     */
    public static over(selector: Selector, options?: SelectorOptions & { modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[] }): Hover {
        const instance = new Hover(selector, options);
        instance.setCallStackInitializeCalledWith({ selector, options });
        return instance;
    }
}
