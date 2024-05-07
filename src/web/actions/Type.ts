import { Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { FrameEnabledAction } from '../templates/FrameEnabledAction';

/**
 * Action Class. Type specified input into an element specified by a selector string.
 */
export class Type extends FrameEnabledAction {
    private selector: Selector;

    private options?: SelectorOptions;

    private input: string;

    private constructor(selector: Selector, input: string, options?: SelectorOptions) {
        super();

        this.selector = selector;
        this.options = options;
        this.input = input;
    }

    /**
     * find the specified selector and fill it.
     *
     * @param {Actor} actor the actor which is used
     * @return {void} Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.
     */
    public async performAs(actor: Actor): Promise<void> {
        const {
            abilityAlias, selector, options, frameTree, input,
        } = this;
        const locator = await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(selector, options, frameTree);
        return locator.type(input);
    }

    /**
     * Finds the specified selector and will it with the specified input string.
     *
     * @param {Selector} selector the selector.
     * @param {string} input the input.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Type} new Type instance
     * @deprecated Please use Press.sequentially instead. This function will be removed in the future.
     */
    public static in(selector: Selector, input: string, options?: SelectorOptions): Type {
        const instance = new Type(selector, input, options);
        instance.setCallStackInitializeCalledWith({ selector, input, options });
        return instance;
    }
}
