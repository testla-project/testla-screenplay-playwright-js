import { expect, Locator, Page } from '@playwright/test';
import { ElementHandle } from 'playwright';
import { Ability, Actor } from '@testla/screenplay';
import playwrightConfig from '../../playwright.config';

/**
 * This class represents the actor's ability to use a Browser.
 */
export class BrowseTheWeb extends Ability {
    /**
     * Initialize this Ability by passing an already existing Playwright Page object.
     *
     * @param page the Playwright Page that will be used to browse.
     */
    public static using(page: Page): BrowseTheWeb {
        return new BrowseTheWeb(page);
    }

    /**
     * Use this Ability as an Actor.
     *
     * @param actor
     */
    public static as(actor: Actor): BrowseTheWeb {
        return actor.withAbilityTo(this) as BrowseTheWeb;
    }

    // add the abilities to the actor.
    public constructor(private page: Page) {
        super();
    }

    /**
     * Find a locator on the page by its selector.
     *
     * @param selector the locator to search for.
     */
    public async findLocator(selector: string): Promise<Locator> {
        return this.page.locator(selector);
    }

    /**
     * Find a selector on the page.
     *
     * @param selector
     */
    public async findSelector(selector: string): Promise<ElementHandle<SVGElement | HTMLElement>> {
        return this.page.waitForSelector(selector);
    }

    public async findSubselector(selector: string, hasText: string, subselector?: string): Promise<Locator> {
        const element = this.page.locator(selector, { hasText });
        return subselector ? element.locator(subselector) : element;
    }

    /**
     * Use the page to navigate to the specified URL.
     *
     * @param url the url to access.
     */
    public async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * Wait for the specified loading state.
     *
     * @param status the status to wait for. Allowed: "load" | "domcontentloaded" | "networkidle".
     */
    public async waitForState(status: string): Promise<void> {
        switch (status) {
            case 'networkidle': return this.page.waitForLoadState(status); break;
            case 'domcontentloaded': return this.page.waitForLoadState(status); break;
            case 'load': return this.page.waitForLoadState(status); break;

            default: throw new Error('Error: invalid state passed to Wait.for()!');
        }
    }

    /**
     * Use the page mouse to hover over the specified element.
     *
     * @param selector the selector of the element to hover over.
     * @param modifiers (optional) the keys that should be pressed while hovering. Allowed: 'Alt' | 'Control' | 'Meta' | 'Shift'.
     */
    public async hoverOver(selector: string, modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[]): Promise<void> {
        return this.page.hover(selector, { modifiers });
    }

    /**
     * Wait for the specified selector to be visible/active and click on it.
     *
     * @param selector the selector of the element.
     */
    public async waitForSelectorAndClick(selector: string): Promise<void> {
        const locator = await this.page.waitForSelector(selector);
        return locator.click();
    }

    /**
     * Press the specified key(s) on the keyboard.
     *
     * @param input the key(s). multiple keys can be pressed by concatenating with "+"
     */
    public async pressKey(input: string): Promise<void> {
        return this.page.keyboard.press(input);
    }

    /**
     * Check the specified checkbox.
     *
     * @param selector the selector of the checkbox.
     */
    public async checkBox(selector: string): Promise<void> {
        return this.page.check(selector);
    }

    /**
     * Wait until the text element of the specified selector equals the specified expected string.
     *
     * @param selector the selector of the element.
     * @param expected the expected string that the element text should be.
     * @param maxTimeout (optional): maximum timeout to wait.
     */
    public async waitUntilEquals(selector: string, expected: string, maxTimeout?: number) {
        await expect(this.page.locator(selector)).toHaveText(expected, { timeout: maxTimeout || playwrightConfig.expect?.timeout });
    }

    /**
     * Drag the specified source element to the specified target element and drop it.
     *
     * @param sourceSelector the selector of the source element.
     * @param targetSelector the selector of the target element.
     */
    public async dragAndDrop(sourceSelector: string, targetSelector: string): Promise<void> {
        return this.page.dragAndDrop(sourceSelector, targetSelector);
    }
}
