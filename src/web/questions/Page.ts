import { Actor, Question } from '@testla/screenplay';
import { expect } from '@playwright/test';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { CheckMode } from '../../types';

type PageOptions = {
    timeout?: number;
};

/**
 * Question Class for the current page.
 */
export class Page extends Question<boolean> {
    private urlDef?: string | RegExp;

    private checkMode: CheckMode;

    private options?: PageOptions;

    private constructor(checkMode: CheckMode) {
        super();
        this.checkMode = checkMode;
    }

    /**
     * Verifies if page...
     *
     * @param {Actor} actor the actor
     * @return {boolean} if .is was called -> positive check, if .not was called -> negative check
     */
    public async answeredBy(actor: Actor): Promise<boolean> {
        const {
            urlDef = '', checkMode, options, abilityAlias,
        } = this;

        const page = await BrowseTheWeb.as(actor, abilityAlias).getPage();

        if (checkMode === 'positive') {
            await expect(page).toHaveURL(urlDef, { timeout: options?.timeout });
        } else {
            await expect(page).not.toHaveURL(urlDef, { timeout: options?.timeout });
        }

        return Promise.resolve(true); // if the ability method is not the expected result there will be an exception
    }

    /**
     * make the Question check for the positive.
     * @return {Page} new Page instance
     */
    static get toHave() {
        return new Page('positive');
    }

    /**
     * make the Question check for the negative.
     * @return {Page} new Page instance
     */
    static get notToHave() {
        return new Page('negative');
    }

    /**
     * Verifies if an element is enabled.
     *
     * @param {string | RegExp} url the url
     * @param {Options} options (optional).
     * @return {Page} this Page instance
     */
    public url(url: string | RegExp, options?: PageOptions): Page {
        this.urlDef = url;
        this.options = options;
        this.addToCallStack({ caller: 'url', calledWith: { url, options } });

        return this;
    }
}
