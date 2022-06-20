import { Cookie } from '@playwright/test';
import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Add either Cookies, Session Storage Items or Local Storage Items to the Browser.
 */
// separate Set (storage) and Add (cookies)
export class Add extends Action {
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
            return BrowseTheWeb.as(actor).setSessionStorageItem(this.payload.key, this.payload.value);
        }
        if (this.mode === 'localStorage') {
            return BrowseTheWeb.as(actor).setLocalStorageItem(this.payload.key, this.payload.value);
        }
        throw new Error('Error: no match for Add.performAs()!');
    }

    /**
     * Add the specified cookies.
     *
     * @param cookies the cookies to add.
     */
    public static cookies(cookies: Cookie[]): Add {
        return new Add('cookies', cookies);
    }

    /**
     * Add a session storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
     *
     * @param key the key that specifies the item.
     * @param value the value of the item.
     */
    public static sessionStorageItem(key: string, value: any): Add {
        return new Add('sessionStorage', { key, value });
    }

    /**
     * Add a local storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
     *
     * @param key the key that specifies the item.
     * @param value the value of the item.
     */
    public static localStorageItem(key: string, value: any): Add {
        return new Add('localStorage', { key, value });
    }
}
