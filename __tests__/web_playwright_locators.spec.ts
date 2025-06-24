import {
    expect, Page, test as base,
} from '@playwright/test';
import { Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../src/web/abilities/BrowseTheWeb';
import { Navigate } from '../src/web/actions/Navigate';
import { Wait } from '../src/web/actions/Wait';
import { DragAndDrop } from '../src/web/actions/DragAndDrop';
import { Check } from '../src/web/actions/Check';
import { Click } from '../src/web/actions/Click';
import { Fill } from '../src/web/actions/Fill';
import { Type } from '../src/web/actions/Type';
import { Hover } from '../src/web/actions/Hover';
import { Press } from '../src/web/actions/Press';
import { Element } from '../src/web/questions/Element';
import { LazySelector } from '../src/web/types';

type MyActors = {
    actor: Actor;
};

const test = base.extend<MyActors>({
    actor: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const actor = Actor.named('TestActor').can(BrowseTheWeb.using(page));
        await use(actor);
    },
});

class MyScreen {
    static LAZY_SELECTOR: LazySelector = (page) => page.getByRole('button', { name: 'Add Element' });

    static IFRAME = '#mce_0_ifr';

    static TINYMCE: LazySelector = (page) => page.getByLabel('Rich Text Area. Press ALT-0 for help.');

    static TINYMCE_IN_IFRAME: LazySelector = (page) => page.frameLocator('iframe[title="Rich Text Area"]').getByText('Your content goes here.');
}

// TODO: implement test for DoubleClick
// TODO: test different details between Fill and Type
test.describe('Testing screenplay-playwright-js web module', () => {
    test('Navigate', async ({ actor }) => {
        await test.step('Navigate to playwright page', async () => {
            await actor.attemptsTo(
                Navigate.to('https://google.com'),
            );
            await expect(BrowseTheWeb.as(actor).getPage()).toHaveURL('https://www.google.com');
        });
    });

    test('DragAndDrop', async ({ actor }) => {
        const page: Page = BrowseTheWeb.as(actor).getPage();

        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/drag_and_drop'),
            Wait.forLoadState('networkidle'),
        );

        // before drag: Box A is on the Left
        await expect(BrowseTheWeb.as(actor).getPage().locator('[id="column-a"] header')).toHaveText('A');

        // execute the drag
        await actor.attemptsTo(
            DragAndDrop.execute(page.locator('[id="column-a"]'), page.locator('[id="column-b"]')),
        );
        // after Drag: Box B is on the Left
        await expect(BrowseTheWeb.as(actor).getPage().locator('[id="column-a"] header')).toHaveText('B');
    });

    test('Check', async ({ actor }) => {
        const page: Page = BrowseTheWeb.as(actor).getPage();

        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/checkboxes'),
            Wait.forLoadState('networkidle'),
            Check.element(page.locator('//input[1]')),
            Check.element(page.locator('//input[2]')),
        );
        // assertion
        await expect(page.locator('//input[1]')).toBeChecked();
        await expect(page.locator('//input[2]')).toBeChecked();
    });

    test('Click', async ({ actor }) => {
        const page: Page = BrowseTheWeb.as(actor).getPage();

        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/add_remove_elements/'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there is no button before we add it with our Click
        await expect(page.locator('[class="added-manually"]')).toHaveCount(0);

        await actor.attemptsTo(
            Click.on(page.locator('button'), { hasText: 'Add Element' }),
        );
        // assert that the button is here after our Click
        await expect(page.locator('[class="added-manually"]')).toHaveCount(1);
    });

    test('Fill+Type', async ({ actor }) => {
        const page: Page = BrowseTheWeb.as(actor).getPage();

        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/login'),
            Wait.forLoadState('networkidle'),
            Fill.in(page.locator('[id="username"]'), 'tomsmith'),
            Type.in(page.locator('[id="password"]'), 'SuperSecretPassword!'),
            Click.on(page.locator('[class="radius"]')),
            Wait.forLoadState('networkidle'),
        );
        // assert that the login worked
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
    });

    test('Hover', async ({ actor }) => {
        const page: Page = BrowseTheWeb.as(actor).getPage();

        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/hovers'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there is no info before the hover
        await expect(page.locator('[href="/users/1"]')).not.toBeVisible();

        await actor.attemptsTo(
            Hover.over(page.locator('div.figure:nth-child(3) > img:nth-child(1)')),
        );
        // assert that the info is now visible after hover
        await expect(page.locator('[href="/users/1"]')).toBeVisible();
    });

    test('Press', async ({ actor }) => {
        const page: Page = BrowseTheWeb.as(actor).getPage();

        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/key_presses'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there is nothing in the result box
        await expect(page.locator('[id="result"]')).toHaveText('');

        await actor.attemptsTo(
            Click.on(page.locator('[id="target"]')),
            Press.key('a'),
        );
        // assert that the pressed button was recognized
        await expect(page.locator('[id="result"]')).toHaveText('You entered: A');
    });

    test('PressSequentially', async ({ actor }) => {
        const page: Page = BrowseTheWeb.as(actor).getPage();
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/key_presses'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there is nothing in the result box
        await expect(BrowseTheWeb.as(actor).getPage().locator('[id="result"]')).toHaveText('');

        await actor.attemptsTo(
            Press.sequentially(page.locator('[id="target"]'), 'abc'),
        );
        // assert that the pressed button was recognized
        await expect(page.locator('[id="result"]')).toHaveText('You entered: C');
    });

    test('Handle iFrames', async ({ actor }) => {
        const page: Page = BrowseTheWeb.as(actor).getPage();
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/iframe'),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Element.toBe.visible(page.frameLocator('#mce_0_ifr').locator('#tinymce', { hasText: 'Your content goes here.' })),
        )).toBe(true);
    });

    test('Handle nested Frames', async ({ actor }) => {
        const page: Page = BrowseTheWeb.as(actor).getPage();
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/nested_frames'),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Element.toBe.visible(page.frameLocator('[name="frame-top"]').frameLocator('[name="frame-middle"]').locator('#content', { hasText: 'MIDDLE' })),
        )).toBe(true);
    });

    test('Wait + Recursive Locators', async ({ actor }) => {
        const page: Page = BrowseTheWeb.as(actor).getPage();

        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/tables'),
            Wait.forLoadState('networkidle'),

            // Locator@[id="table1"] >> tbody tr >> internal:has="text=Conway" >> td:has-text("$50.00")
            // Wait.forSelector(page.locator('[id="table1"]'), { subSelector: [('tbody tr'), { hasText: 'Conway', subSelector: [('td:has-text("$50.00")')] }] }),
            Wait.forSelector(page.locator('[id="table1"]'), { subSelector: [('tbody tr'), { hasText: 'Conway', subSelector: [page.locator('td:has-text("$50.00")')] }] }),
        );
    });

    test('Element.visible', async ({ actor }) => {
        const page: Page = BrowseTheWeb.as(actor).getPage();

        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/tables'),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Element.toBe.visible(page.locator('h3'), { hasText: 'Data Tables' }),
        )).toBe(true);

        let visibleRes = false;
        try {
            expect(await actor.asks(
                Element.toBe.visible(page.locator('h3'), { hasText: 'this does not exist', timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            visibleRes = true;
        }
        expect(visibleRes).toBeTruthy();

        expect(await actor.asks(
            Element.notToBe.visible(page.locator('h3'), { hasText: 'this does not exist' }),
        )).toBe(true);

        let notVisibleRes = false;
        try {
            expect(await actor.asks(
                Element.notToBe.visible(page.locator('h3'), { hasText: 'Data Tables', timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            notVisibleRes = true;
        }
        expect(notVisibleRes).toBeTruthy();
    });

    test('Element.enabled', async ({ actor }) => {
        // const ENABLED_ELEMENT = '[aria-label="Undo"]';
        // const DISABLED_ELEMENT = '[aria-label="Redo"]';
        // const URL = 'https://the-internet.herokuapp.com/tinymce';
        // or
        const ENABLED_ELEMENT = '#checkbox input[type="checkbox"]';
        const DISABLED_ELEMENT = '#input-example input[type="text"]';
        const URL = 'https://the-internet.herokuapp.com/dynamic_controls';

        const page: Page = BrowseTheWeb.as(actor).getPage();

        await actor.attemptsTo(
            Navigate.to(URL),
            Wait.forLoadState('networkidle'),
            // Click.on('[aria-label="Bold"]'),
        );

        expect(await actor.asks(
            Element.toBe.enabled(page.locator(ENABLED_ELEMENT)),
        )).toBe(true);

        let enabledRes = false;
        try {
            expect(await actor.asks(
                Element.toBe.enabled(page.locator(DISABLED_ELEMENT), { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            enabledRes = true;
        }
        expect(enabledRes).toBeTruthy();

        expect(await actor.asks(
            Element.notToBe.enabled(page.locator(DISABLED_ELEMENT)),
        )).toBe(true);

        let notEnabledRes = false;
        try {
            expect(await actor.asks(
                Element.notToBe.enabled(page.locator(ENABLED_ELEMENT), { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            notEnabledRes = true;
        }
        expect(notEnabledRes).toBeTruthy();
    });

    test('Click with LazySelector', async ({ actor }) => {
        const page: Page = BrowseTheWeb.as(actor).getPage();

        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/add_remove_elements/'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there is no button before we add it with our Click
        await expect(page.locator('[class="added-manually"]')).toHaveCount(0);

        await actor.attemptsTo(
            Click.on(MyScreen.LAZY_SELECTOR),
        );

        // assert that the button is here after our Click
        await expect(page.locator('[class="added-manually"]')).toHaveCount(1);
    });

    test('Handle iFrames in combination with LazySelector', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/iframe'),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Element.toBe.visible(MyScreen.TINYMCE).inFrame(MyScreen.IFRAME),
            Element.toBe.visible(MyScreen.TINYMCE_IN_IFRAME),
        )).toBe(true);
    });
});
