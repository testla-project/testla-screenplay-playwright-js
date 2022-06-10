import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Remove either Cookies, Session Storage Items or Local Storage Items from the Browser.
 */
export class Remove extends Action {
    private constructor(private mode: 'cookies' | 'sessionStorage' | 'localStorage', private payload?: any) {
        super();
    }

    /**
     * wait for either a specified loading state or for a selector to become visible/active.
     *
     * @param actor
     */
    public performAs(actor: Actor): Promise<any> {
        if (this.mode === 'cookies') {
            return BrowseTheWeb.as(actor).clearCookies();
        }
        if (this.mode === 'sessionStorage') {
            return BrowseTheWeb.as(actor).removeSessionLocalStorageItem(this.payload);
        }
        if (this.mode === 'localStorage') {
            return BrowseTheWeb.as(actor).removeLocalStorageItem(this.payload);
        }
        throw new Error('Error: no match for Remove.performAs()!');
    }

    /**
     * Clear all browser cookies.
     */
    public static cookies(): Remove {
        return new Remove('cookies');
    }

    /**
     * Remove a session storage item.
     *
     * @param key the key that specifies the item.
     */
    public static sessionStorageItem(key: string): Remove {
        return new Remove('sessionStorage', key);
    }

    /**
     * Remove a local storage item.
     *
     * @param key the key that specifies the item.
     */
    public static localStorageItem(key: string): Remove {
        return new Remove('localStorage', key);
    }
}
