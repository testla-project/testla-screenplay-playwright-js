import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Remove either Session Storage Items or Local Storage Items from the Browser.
 */
export class Remove extends Action {
    private mode: 'sessionStorage' | 'localStorage';

    private payload?: any;

    private constructor(mode: 'sessionStorage' | 'localStorage', payload?: any) {
        super();

        this.mode = mode;
        this.payload = payload;
    }

    /**
     * wait for either a specified loading state or for a selector to become visible/active.
     *
     * @param {Actor} actor Actor performing this action
     * @return {any} Returns the value of the `pageFunction` invocation.
     */
    public performAs(actor: Actor): Promise<any> {
        const { abilityAlias, mode, payload } = this;
        const page = BrowseTheWeb.as(actor, abilityAlias).getPage();
        return page.evaluate(({ k, m }) => {
            const storage = m === 'sessionStorage' ? sessionStorage : localStorage;
            storage.removeItem(k);
            return Promise.resolve();
        }, { k: payload, m: mode });
    }

    /**
     * Remove a session storage item, if a key/value pair with the given key exists.
     *
     * @param {string} key the key that specifies the item.
     * @return {Remove} new Remove instance for session storage
     */
    public static sessionStorageItem(key: string): Remove {
        const instance = new Remove('sessionStorage', key);
        instance.setCallStackInitializeCalledWith({ key });
        return instance;
    }

    /**
     * Remove a local storage item, if a key/value pair with the given key exists.
     *
     * @param {string} key the key that specifies the item.
     * @return {Remove} new Remove instance for local storage
     */
    public static localStorageItem(key: string): Remove {
        const instance = new Remove('localStorage', key);
        instance.setCallStackInitializeCalledWith({ key });
        return instance;
    }
}
