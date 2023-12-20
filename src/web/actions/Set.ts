import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Set either Session Storage Items or Local Storage Items on the Browser.
 */
export class Set extends Action {
    private constructor(private mode: 'sessionStorage' | 'localStorage', private payload: any) {
        super();
    }

    /**
     * set the specified storage item.
     *
     * @param {Actor} actor Actor performing this action
     * @return {any} Returns the value of the `pageFunction` invocation.
     */
    public performAs(actor: Actor): Promise<any> {
        if (this.mode === 'sessionStorage') {
            return BrowseTheWeb.as(actor, this.abilityAlias).setSessionStorageItem(this.payload.key, this.payload.value);
        }
        if (this.mode === 'localStorage') {
            return BrowseTheWeb.as(actor, this.abilityAlias).setLocalStorageItem(this.payload.key, this.payload.value);
        }
        throw new Error('Error: no match for Set.performAs()!');
    }

    /**
     * Set a session storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
     *
     * @param {string} key the key that specifies the item.
     * @param {any} value the value of the item.
     * @return {Set} new Set instance for session storage
     */
    public static sessionStorageItem(key: string, value: any): Set {
        return new Set('sessionStorage', { key, value });
    }

    /**
     * Set a local storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
     *
     * @param {string} key the key that specifies the item.
     * @param {any} value the value of the item.
     * @return {Set} new Set instance for local storage.
     */
    public static localStorageItem(key: string, value: any): Set {
        return new Set('localStorage', { key, value });
    }
}
