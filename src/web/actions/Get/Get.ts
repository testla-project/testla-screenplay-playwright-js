import { Actor } from '@testla/screenplay';
import { FrameEnabledAction } from '../../templates/FrameEnabledAction';
import { GetCookiesStrategy } from './strategies/GetCookiesStrategy';
import { Selector, SelectorOptions } from '../../types';
import { GetElementsStrategy } from './strategies/GetElementsStrategy';
import { GetStorageItemStrategy } from './strategies/GetStorageItemStrategy';

type Strategy = GetCookiesStrategy | GetElementsStrategy | GetStorageItemStrategy;

/**
 * Action Class. Get either Cookies, Session Storage Items, Local Storage Items or Elements from the Browser.
 */
export class Get extends FrameEnabledAction {
    private strategy: Strategy;

    private constructor(strategy: Strategy) {
        super();
        this.strategy = strategy;
    }

    /**
     * Get either Cookies, Session Storage Items, Local Storage Items or Elements from the Browser.
     *
     * @param {Actor} actor Actor performing this action
     * @return {any} Returns cookies, session storage items, local storage items or Locator(s)
     */
    public async performAs(actor: Actor) {
        const { frameTree, abilityAlias } = this;
        return this.strategy.execute({ actor, abilityAlias, frameTree });
    }

    /**
     * Get the specified cookies.
     *
     * @param {string} urls (optional): If URLs are specified, only cookies that affect those URLs are returned. If no URLs are specified, this all cookies are returned.
     * @return {Get} new Get instance for cookies
     */
    public static cookies(urls?: string | string[] | undefined): Get {
        const strategy = new GetCookiesStrategy(urls);
        const instance = new Get(strategy);
        instance.setCallStackInitializeCalledWith({ urls });
        return instance;
    }

    /**
     * Get a session storage item.
     *
     * @param {string} key the key that specifies the item.
     * @return {Get} new Get instance for session storage
     */
    public static sessionStorageItem(key: string): Get {
        const strategy = new GetStorageItemStrategy('sessionStorage', key);
        const instance = new Get(strategy);
        instance.setCallStackInitializeCalledWith({ key });
        return instance;
    }

    /**
     * Get a local storage item.
     *
     * @param {string} key the key that specifies the item.
     * @return {Get} new Get instance for local storage
     */
    public static localStorageItem(key: string): Get {
        const strategy = new GetStorageItemStrategy('localStorage', key);
        const instance = new Get(strategy);
        instance.setCallStackInitializeCalledWith({ key });
        return instance;
    }

    /**
     * Get a single screen element by its Selector
     *
     * @param {Selector} selector the string or locator representing the selector.
     * @param {SelectorOptions} options (optional): advanced selector lookup options.
     * @returns new Get instance
     */
    public static element(selector: Selector, options?: SelectorOptions): Get {
        const strategy = new GetElementsStrategy(selector, options, true);
        const instance = new Get(strategy);
        instance.setCallStackInitializeCalledWith({ selector, options });
        return instance;
    }

    /**
     * Get a list of screen elements by its Selector
     *
     * @param {Selector} selector the string or locator representing the selector.
     * @param {SelectorOptions} options (optional): advanced selector lookup options.
     * @returns new Get instance
     */
    public static elements(selector: Selector, options?: SelectorOptions): Get {
        const strategy = new GetElementsStrategy(selector, options, false);
        const instance = new Get(strategy);
        instance.setCallStackInitializeCalledWith({ selector, options });
        return instance;
    }
}
