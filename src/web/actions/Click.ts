import { Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { FrameEnabledAction } from '../templates/FrameEnabledAction';

/**
 * Options for the Click action.
 *
 * @property {('left'|'right'|'middle')} [button] - The mouse button to use for the click.
 * @property {number} [clickCount] - Number of times to click.
 * @property {number} [delay] - Time to wait between mousedown and mouseup in milliseconds.
 * @property {boolean} [force] - Whether to bypass actionability checks.
 * @property {Array<'Alt'|'Control'|'Meta'|'Shift'>} [modifiers] - Modifier keys to press during the click.
 * @property {boolean} [noWaitAfter] - Do not wait for navigations after the click.
 * @property {{x: number, y: number}} [position] - Click position relative to the top-left corner of the element.
 * @property {boolean} [trial] - Perform a trial run without actually clicking.
 */
type ClickOptions = {
    button?: 'left'|'right'|'middle';
    clickCount?: number;
    delay?: number;
    force?: boolean;
    modifiers?: Array<'Alt'|'Control'|'Meta'|'Shift'>;
    noWaitAfter?: boolean;
    position?: {
        x: number;
        y: number;
    };
    trial?: boolean;
};

/**
 * Action Class. Click on an element specified by a selector string.
 */
export class Click extends FrameEnabledAction {
    private selector: Selector;

    private options?: SelectorOptions & ClickOptions;

    private constructor(selector: Selector, options?: SelectorOptions & ClickOptions) {
        super();

        this.selector = selector;
        this.options = options;
    }

    /**
     * find the specified selector and click on it.
     *
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns after clicking the element
     */
    public async performAs(actor: Actor): Promise<void> {
        const {
            abilityAlias, selector, options, frameTree,
        } = this;
        const locator = await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(selector, options, frameTree);
        return locator.click({
            button: options?.button,
            clickCount: options?.clickCount,
            delay: options?.delay,
            force: options?.force,
            modifiers: options?.modifiers,
            noWaitAfter: options?.noWaitAfter,
            position: options?.position,
            trial: options?.trial,
        });
    }

    /**
     * specify which element should be clicked on
     *
     * @param {Selector} selector the string representing the selector.
     * @param {SelectorOptions & ClickOptions} options (optional): advanced selector lookup options.
     * @return {Click} new Click instance
     */
    public static on(selector: Selector, options?: SelectorOptions & ClickOptions): Click {
        const instance = new Click(selector, options);
        instance.setCallStackInitializeCalledWith({ selector, options });
        return instance;
    }
}
