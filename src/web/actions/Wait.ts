import { Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { FrameEnabledAction } from '../templates/FrameEnabledAction';

type WaitFOrUrlOptions = {
    timeout?: number;
    waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
};

/**
 * Action Class. Wait for either a specified loading state or for a selector to become visible/active.
 */
export class Wait extends FrameEnabledAction {
    // the object that determines what to wait for (loading state, selector or selector == expected).
    // only 1 property is active at all times.
    private action: {
        mode: 'selector' | 'loadState' | 'event' | 'url';
        payload?: any;
    };

    private constructor(action: { mode: 'selector' | 'loadState' | 'event' | 'url', payload?: any }) {
        super();
        this.action = action;
    }

    /**
     * wait for either a specified loading state or for a selector to become visible/active.
     *
     * @param {Actor} actor the actor object
     * @return {any} Returns when the required load state has been reached.
     */
    public async performAs(actor: Actor): Promise<any> {
        const { abilityAlias, action, frameTree } = this;
        const page = BrowseTheWeb.as(actor, abilityAlias).getPage();

        if (this.action.mode === 'loadState') {
            return page.waitForLoadState(action.payload.state);
        }
        if (this.action.mode === 'event') {
            return page.waitForEvent(action.payload.event);
        }
        if (this.action.mode === 'url') {
            return page.waitForURL(action.payload.url, action.payload.options);
        }
        // fallback: action.mode === 'selector'
        return BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(action.payload.selector, action.payload.options, frameTree);
    }

    /**
     * Wait for a specific status of the page.
     *
     * @param {string} state either 'load', 'domcontentloaded' or 'networkidle'
     * @return {Wait} new Wait instance
     */
    public static forLoadState(state: 'load' | 'domcontentloaded' | 'networkidle'): Wait {
        const instance = new Wait({ mode: 'loadState', payload: { state } });
        instance.setCallStackInitializeCalledWith({ state });
        return instance;
    }

    /**
     * Wait for a specific selector to exist.
     *
     * @param {Selector} selector the selector.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Wait} new Wait instance
     */
    public static forSelector(selector: Selector, options?: SelectorOptions): Wait {
        const instance = new Wait({ mode: 'selector', payload: { selector, options } });
        instance.setCallStackInitializeCalledWith({ selector, options });
        return instance;
    }

    /**
     * Wait for a specific event.
     *
     * @param {string} event the event.
     * @return {Wait} new Wait instance
     */
    public static forEvent(event: string): Wait {
        const instance = new Wait({ mode: 'event', payload: { event } });
        instance.setCallStackInitializeCalledWith({ event });
        return instance;
    }

    /**
     * Wait for a specific url.
     *
     * @param {string} url the url to wait for.
     * @return {Wait} new Wait instance
     */
    public static forUrl(url: string | RegExp, options?: WaitFOrUrlOptions): Wait {
        const instance = new Wait({ mode: 'url', payload: { url, options } });
        instance.setCallStackInitializeCalledWith({ url, options });
        return instance;
    }
}
