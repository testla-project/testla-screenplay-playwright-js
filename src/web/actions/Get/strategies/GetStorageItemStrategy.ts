import { BrowseTheWeb } from "../../../abilities/BrowseTheWeb";
import { Page } from "@playwright/test";
import { ExecuteParams } from "../types";

type StorageType = 'sessionStorage' | 'localStorage';

export class GetStorageItemStrategy {
    private storageType: StorageType

    private key: string;

    constructor(storageType: StorageType, key: string) {
        this.storageType = storageType;
        this.key = key;
    }

    public async execute({ actor, abilityAlias }: ExecuteParams): Promise<any> {
        const page = BrowseTheWeb.as(actor, abilityAlias).getPage();
        return GetStorageItemStrategy.getStorageItem(page, this.storageType, this.key);
    }

    private static async getStorageItem(page: Page, storageType: 'sessionStorage' | 'localStorage', key: string): Promise<any> {
        return page.evaluate(({ k, t }) => {
            const storage = t === 'sessionStorage' ? sessionStorage : localStorage;
            const value = storage.getItem(k);
            if (value) {
                return Promise.resolve(JSON.parse(value));
            }
            return Promise.resolve(undefined);
        }, { k: key, t: storageType });
    }
}