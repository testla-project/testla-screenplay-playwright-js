import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Set either Session Storage Items or Local Storage Items on the Browser.
 */
export class Set extends Action {
    private mode: 'sessionStorage' | 'localStorage';

    private payload?: any;

    private constructor(mode: 'sessionStorage' | 'localStorage', payload?: any) {
        super();

        this.mode = mode;
        this.payload = payload;
    }

    /**
     * set the specified storage item.
     *
     * @param {Actor} actor Actor performing this action
     * @return {any} Returns the value of the `pageFunction` invocation.
     */
    public performAs(actor: Actor): Promise<any> {
        const { abilityAlias, mode, payload } = this;
        const page = BrowseTheWeb.as(actor, abilityAlias).getPage();
        return page.evaluate(({ k, v, mode }) => {
            const storage = mode === 'sessionStorage' ? sessionStorage : localStorage;
            storage.setItem(k, JSON.stringify(v));
            return Promise.resolve();
        }, { k: payload.key, v: payload.value, mode });
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
