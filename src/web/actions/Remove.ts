import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Remove either Session Storage Items or Local Storage Items from the Browser.
 */
export class Remove extends Action {
    private constructor(private mode: 'sessionStorage' | 'localStorage', private payload?: any) {
        super();
    }

    /**
     * wait for either a specified loading state or for a selector to become visible/active.
     *
     * @param {Actor} actor The actor object
     */
    public performAs(actor: Actor): Promise<any> {
        if (this.mode === 'sessionStorage') {
            return BrowseTheWeb.as(actor).removeSessionStorageItem(this.payload);
        }
        if (this.mode === 'localStorage') {
            return BrowseTheWeb.as(actor).removeLocalStorageItem(this.payload);
        }
        throw new Error('Error: no match for Remove.performAs()!');
    }

    /**
     * Remove a session storage item, if a key/value pair with the given key exists.
     *
     * @param key the key that specifies the item.
     */
    public static sessionStorageItem(key: string): Remove {
        return new Remove('sessionStorage', key);
    }

    /**
     * Remove a local storage item, if a key/value pair with the given key exists.
     *
     * @param key the key that specifies the item.
     */
    public static localStorageItem(key: string): Remove {
        return new Remove('localStorage', key);
    }
}
