import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Get either Cookies, Session Storage Items or Local Storage Items from the Browser.
 */
export class Get extends Action {
    private constructor(private mode: 'cookies' | 'sessionStorage' | 'localStorage', private payload: any) {
        super();
    }

    /**
     * wait for either a specified loading state or for a selector to become visible/active.
     *
     * @param {Actor} actor the actor which is used
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
        throw new Error('Error: no match for Get.performAs()!');
    }

    /**
     * Get the specified cookies.
     *
     * @param {string} urls (optional): If URLs are specified, only cookies that affect those URLs are returned. If no URLs are specified, this all cookies are returned.
     */
    public static cookies(urls?: string | string[] | undefined): Get {
        return new Get('cookies', urls);
    }

    /**
     * Get a session storage item.
     *
     * @param {string} key the key that specifies the item.
     */
    public static sessionStorageItem(key: string): Get {
        return new Get('sessionStorage', key);
    }

    /**
     * Get a local storage item.
     *
     * @param {string} key the key that specifies the item.
     */
    public static localStorageItem(key: string): Get {
        return new Get('localStorage', key);
    }
}
