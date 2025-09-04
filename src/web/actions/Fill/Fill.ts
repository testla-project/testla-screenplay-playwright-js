import { Actor } from '@testla/screenplay';
import { Maskable, Selector, SelectorOptions } from '../../types';
import { BrowseTheWeb } from '../../abilities/BrowseTheWeb';
import { FrameEnabledAction } from '../../templates/FrameEnabledAction';
import { MASKING_STRING } from '../../../constants';

/**
 * Action Class. Fill an element specified by a selector string with the specified input.
 */
export class Fill extends FrameEnabledAction {
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
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns after checks, focuses the element, fills it and triggers an `input` event after filling.
     */
    public async performAs(actor: Actor): Promise<void> {
        const {
            abilityAlias, selector, options, frameTree, input,
        } = this;
        const locator = await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(selector, options, frameTree);
        return locator.fill(input);
    }

    /**
     * Finds the specified selector and will it with the specified input string.
     *
     * @param {Selector} selector the selector.
     * @param {string} input the input.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Fill} new Fill instance
     */
    public static in(selector: Selector, input: string, options?: SelectorOptions & Maskable): Fill {
        const instance = new Fill(selector, input, options);
        const inputToLog = options?.maskInLogs ? MASKING_STRING : input;
        instance.setCallStackInitializeCalledWith({ selector, input: inputToLog, options });
        return instance;
    }
}
