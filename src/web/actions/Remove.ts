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
     * @param {Actor} actor Actor performing this action
     * @return {any} Returns the value of the `pageFunction` invocation.
     */
    public performAs(actor: Actor): Promise<any> {
        if (this.mode === 'sessionStorage') {
            return BrowseTheWeb.as(actor, this.abilityAlias).removeSessionStorageItem(this.payload);
        }
        if (this.mode === 'localStorage') {
            return BrowseTheWeb.as(actor, this.abilityAlias).removeLocalStorageItem(this.payload);
        }
        throw new Error('Error: no match for Remove.performAs()!');
    }

    /**
     * Remove a session storage item, if a key/value pair with the given key exists.
     *
     * @param {string} key the key that specifies the item.
     * @return {Remove} new Remove instance for session storage
     */
    public static sessionStorageItem(key: string): Remove {
        return new Remove('sessionStorage', key);
    }

    /**
     * Remove a local storage item, if a key/value pair with the given key exists.
     *
     * @param {string} key the key that specifies the item.
     * @return {Remove} new Remove instance for local storage
     */
    public static localStorageItem(key: string): Remove {
        return new Remove('localStorage', key);
    }
}
