import { expect, Locator, Page } from '@playwright/test';
import { ElementHandle, Response } from 'playwright';
import { Ability, Actor } from '@testla/screenplay';

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
    private constructor(private page: Page) {
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
    public async navigate(url: string): Promise<Response | null> {
        return this.page.goto(url);
    }

    /**
     * Wait for the specified loading state.
     *
     * @param status the status to wait for. Allowed: "load" | "domcontentloaded" | "networkidle".
     */
    public async waitForState(status: 'load' | 'domcontentloaded' | 'networkidle'): Promise<void> {
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
    public async hover(selector: string, modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[]): Promise<void> {
        return this.page.hover(selector, { modifiers });
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
     * Wait until the element of the specified selector exists.
     *
     * @param selector the selector of the element.
     */
    public async waitForSelector(selector: string) {
        return this.page.waitForSelector(selector);
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

    /**
     * Fill the element specified by the selector with the given input.
     * 
     * @param selector 
     * @param input 
     * @returns 
     */
    public async fill(selector: string, input: string) {
        return this.page.fill(selector, input);
    }

    /**
     * Type the given input into the element specified by the selector.
     * 
     * @param selector 
     * @param input 
     * @returns 
     */
    public async type(selector: string, input: string) {
        return this.page.type(selector, input);
    }
}
