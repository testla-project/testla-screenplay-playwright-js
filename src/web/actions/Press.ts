import { Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Selector, SelectorOptions } from '../types';
import { FrameEnabledAction } from '../templates/FrameEnabledAction';

/**
 * Action Class. Press the specified key on the keyboard.
 */
export class Press extends FrameEnabledAction {
    private mode: 'key' | 'sequentially';

    private payload: any;

    private constructor(mode: 'key' | 'sequentially', payload: any) {
        super();

        this.mode = mode;
        this.payload = payload;
    }

    /**
     * Press the specified key.
     *
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns when the `key` can specify the intended value or a single character to generate the text for.
     */
    public async performAs(actor: Actor): Promise<void> {
        const {
            abilityAlias, payload, frameTree,
        } = this;

        if (this.mode === 'key') {
            const page = BrowseTheWeb.as(actor, this.abilityAlias).getPage();
            return page.keyboard.press(payload.keys);
        }
        const locator = await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(payload.selector, payload.options, frameTree);
        return locator.pressSequentially(payload.input);
    }

    /**
     * Press a key on the keyboard. (or multiple keys with +, e.g. Shift+A)
     *
     * @param {string} keys the key(s) to press.
     * @return {Press} new Press instance
     */
    public static key(keys: string): Press {
        const instance = new Press('key', { keys });
        instance.setCallStackInitializeCalledWith({ keys });
        return instance;
    }

    /**
     * Types the given input into the element specified by the selector.
     * @param {Selector} selector The selector of the source element.
     * @param {string} input The input to type into the element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Press} new Press instance
     */
    public static sequentially(selector: Selector, input: string, options?: SelectorOptions): Press {
        const instance = new Press('sequentially', { selector, input, options });
        instance.setCallStackInitializeCalledWith({ selector, input, options });
        return instance;
    }
}
