import { Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { FrameEnabledAction } from '../templates/FrameEnabledAction';

/**
 * Action Class. Click on an element specified by a selector string.
 */
export class DoubleClick extends FrameEnabledAction {
    private selector: Selector;

    private options?: SelectorOptions;

    private constructor(selector: Selector, options?: SelectorOptions) {
        super();

        this.selector = selector;
        this.options = options;
    }

    /**
     * find the specified selector and click on it.
     *
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns after double clicking the element
     */
    public async performAs(actor: Actor): Promise<void> {
        const {
            abilityAlias, selector, options, frameTree,
        } = this;
        const locator = await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(selector, options, frameTree);
        return locator.dblclick();
    }

    /**
     * specify which element should be clicked on
     *
     * @param {Selector} selector the string representing the selector.
     * @param {SelectorOptions} options (optional): advanced selector lookup options.
     * @return {DoubleClick} new DoubleClick instance
     */
    public static on(selector: Selector, options?: SelectorOptions): DoubleClick {
        const instance = new DoubleClick(selector, options);
        instance.setCallStackInitializeCalledWith({ selector, options });
        return instance;
    }
}
