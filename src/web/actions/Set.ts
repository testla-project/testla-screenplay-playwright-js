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
     * @param actor
     */
    public performAs(actor: Actor): Promise<any> {
        if (this.mode === 'sessionStorage') {
            return BrowseTheWeb.as(actor).setSessionStorageItem(this.payload.key, this.payload.value);
        }
        if (this.mode === 'localStorage') {
            return BrowseTheWeb.as(actor).setLocalStorageItem(this.payload.key, this.payload.value);
        }
        throw new Error('Error: no match for Set.performAs()!');
    }

    /**
     * Set a session storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
     *
     * @param key the key that specifies the item.
     * @param value the value of the item.
     */
    public static sessionStorageItem(key: string, value: any): Set {
        return new Set('sessionStorage', { key, value });
    }

    /**
     * Set a local storage item identified by the given key + value, creating a new key/value pair if none existed for key previously.
     *
     * @param key the key that specifies the item.
     * @param value the value of the item.
     */
    public static localStorageItem(key: string, value: any): Set {
        return new Set('localStorage', { key, value });
    }
}
