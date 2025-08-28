import { Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../../types';
import { BrowseTheWeb } from '../../abilities/BrowseTheWeb';
import { FrameEnabledAction } from '../../templates/FrameEnabledAction';

/**
 * Action Class. DragAndDrop an element specified by a selector string and drop it on an element specified by another
 * selector string.
 */
export class DragAndDrop extends FrameEnabledAction {
    private sourceSelector: Selector;

    private targetSelector: Selector;

    private options?: {
        source?: SelectorOptions;
        target?: SelectorOptions;
    };

    private constructor(sourceSelector: Selector, targetSelector: Selector, options?: {
        source?: SelectorOptions;
        target?: SelectorOptions;
    }) {
        super();

        this.sourceSelector = sourceSelector;
        this.targetSelector = targetSelector;
        this.options = options;
    }

    /**
     * drag the specified selector and drop it on the target.
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns after dragging the locator to another target locator or target position
     */
    public async performAs(actor: Actor): Promise<void> {
        const {
            abilityAlias, sourceSelector, targetSelector, options, frameTree,
        } = this;
        const browseTheWeb = BrowseTheWeb.as(actor, abilityAlias);
        const target = await browseTheWeb.resolveSelectorToLocator(targetSelector, options?.target, frameTree);
        const source = await browseTheWeb.resolveSelectorToLocator(sourceSelector, options?.source, frameTree);
        return source.dragTo(target, { targetPosition: { x: 0, y: 0 } });
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
        const instance = new DragAndDrop(sourceSelector, targetSelector, options);
        instance.setCallStackInitializeCalledWith({ sourceSelector, targetSelector, options });
        return instance;
    }
}
