import { Actor } from '@testla/screenplay';
import { Page } from '@playwright/test';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Selector, SelectorOptions } from '../types';
import { FrameEnabledAction } from '../templates/FrameEnabledAction';

type Mode = 'cookies' | 'sessionStorage' | 'localStorage' | 'element' | 'elements';

/**
 * Action Class. Get either Cookies, Session Storage Items, Local Storage Items or Elements from the Browser.
 */
export class Get extends FrameEnabledAction {
    private mode: Mode;

    private payload: any;

    private constructor(mode: Mode, payload: any) {
        super();

        this.mode = mode;
        this.payload = payload;
    }

    /**
     * Get either Cookies, Session Storage Items, Local Storage Items or Elements from the Browser.
     *
     * @param {Actor} actor Actor performing this action
     * @return {any} Returns cookies, session storage items, local storage items or Locator(s)
     */
    public async performAs(actor: Actor): Promise<any> {
        const {
            abilityAlias, payload, mode, frameTree,
        } = this;
        const page = BrowseTheWeb.as(actor, abilityAlias).getPage();

        if (mode === 'cookies') {
            return page.context().cookies(payload);
        }
        if (mode === 'sessionStorage' || mode === 'localStorage') {
            return Get.getStorageItem(page, mode, payload);
        }
        // fallback: mode === 'element'
        const locator = (await BrowseTheWeb.as(actor, abilityAlias).resolveSelectorToLocator(payload.selector, { ...payload.options, evaluateVisible: false }, frameTree)).filter();
        return payload.singular === false ? locator.all() : locator.first();
    }

    private static async getStorageItem(page: Page, storageType: 'sessionStorage' | 'localStorage', key: string): Promise<any> {
        return page.evaluate(({ k, t }) => {
            const storage = t === 'sessionStorage' ? sessionStorage : localStorage;
            const value = storage.getItem(k);
            if (value) {
                return Promise.resolve(JSON.parse(value));
            }
            return Promise.resolve(undefined);
        }, { k: key, t: storageType });
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
     * @param {Selector} selector the string or locator representing the selector.
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
