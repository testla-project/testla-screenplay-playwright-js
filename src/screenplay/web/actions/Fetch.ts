import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Get either Cookies, Session Storage Items or Local Storage Items from the Browser.
 */
export class Fetch extends Action {
    private constructor(private mode: 'cookies' | 'sessionStorage' | 'localStorage', private payload: any) {
        super();
    }

    /**
     * wait for either a specified loading state or for a selector to become visible/active.
     *
     * @param actor
     */
    public performAs(actor: Actor): Promise<any> {
        if (this.mode === 'cookies') {
            return BrowseTheWeb.as(actor).addCookies(this.payload);
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
     * @param urls (optional): If URLs are specified, only cookies that affect those URLs are returned. If no URLs are specified, this all cookies are returned.
     */
    public static cookies(urls?: string | string[] | undefined): Fetch {
        return new Fetch('cookies', urls);
    }

    /**
     * Get a session storage item.
     *
     * @param key the key that specifies the item.
     */
    public static sessionStorageItem(key: string): Fetch {
        return new Fetch('sessionStorage', key);
    }

    /**
     * Get a local storage item.
     *
     * @param key the key that specifies the item.
     */
    public static localStorageItem(key: string): Fetch {
        return new Fetch('localStorage', key);
    }
}
