import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Selector, SelectorOptions } from '../types';

type Mode = 'cookies' | 'sessionStorage' | 'localStorage' | 'element' | 'elements';

/**
 * Action Class. Get either Cookies, Session Storage Items or Local Storage Items from the Browser.
 */
export class Get extends Action {
    private constructor(private mode: Mode, private payload: any) {
        super();
    }

    /**
     * wait for either a specified loading state or for a selector to become visible/active.
     *
     * @param {Actor} actor Actor performing this action
     * @return {any} Returns cookies, session storage items or local storage items
     */
    public performAs(actor: Actor): Promise<any> {
        if (this.mode === 'cookies') {
            return BrowseTheWeb.as(actor).getCookies(this.payload);
        }
        if (this.mode === 'sessionStorage') {
            return BrowseTheWeb.as(actor).getSessionStorageItem(this.payload);
        }
        if (this.mode === 'localStorage') {
            return BrowseTheWeb.as(actor).getLocalStorageItem(this.payload);
        }
        if (this.mode === 'element') {
            return BrowseTheWeb.as(actor).getElement(this.payload.selector, this.payload.singular, this.payload.options);
        }
        throw new Error('Error: no match for Get.performAs()!');
    }

    /**
     * Get the specified cookies.
     *
     * @param {string} urls (optional): If URLs are specified, only cookies that affect those URLs are returned. If no URLs are specified, this all cookies are returned.
     * @return {Get} new Get instance for cookies
     */
    public static cookies(urls?: string | string[] | undefined): Get {
        return new Get('cookies', urls);
    }

    /**
     * Get a session storage item.
     *
     * @param {string} key the key that specifies the item.
     * @return {Get} new Get instance for session storage
     */
    public static sessionStorageItem(key: string): Get {
        return new Get('sessionStorage', key);
    }

    /**
     * Get a local storage item.
     *
     * @param {string} key the key that specifies the item.
     * @return {Get} new Get instance for local storage
     */
    public static localStorageItem(key: string): Get {
        return new Get('localStorage', key);
    }

    /**
     * Get a single screen element by its Selector
     *
     * * @param {Selector} selector the string or locator representing the selector.
     * @param {SelectorOptions} options (optional): advanced selector lookup options.
     * @returns new Get instance
     */
    public static element(selector: Selector, options?: SelectorOptions): Get {
        return new Get('element', { selector, options });
    }

    /**
     * Get a list of screen elements by its Selector
     *
     * @param {Selector} selector the string or locator representing the selector.
     * @param {SelectorOptions} options (optional): advanced selector lookup options.
     * @returns new Get instance
     */
    public static elements(selector: Selector, options?: SelectorOptions): Get {
        return new Get('element', { selector, options, singular: false });
    }
}
