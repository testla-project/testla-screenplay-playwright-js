import {
    BrowserContext, Cookie, expect, Page, test as base,
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
import { Clear } from '../src/web/actions/Clear';
import { Add } from '../src/web/actions/Add';
import { Get } from '../src/web/actions/Get';
import { Set } from '../src/web/actions/Set';
import { Remove } from '../src/web/actions/Remove';
import { Element } from '../src/web/questions/Element';

type MyActors = {
    actor: Actor;
};

const test = base.extend<MyActors>({
    actor: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const actor = Actor.named('TestActor').can(BrowseTheWeb.using(page)).with('page', page);
        await use(actor);
    },
});

// TODO: implement test for DoubleClick
// TODO: test different details between Fill and Type
test.describe('Testing screenplay-playwright-js web module', () => {
    test('Navigate', async ({ actor }) => {
        await test.step('Navigate to playwright page', async () => {
            await actor.attemptsTo(
                Navigate.to('https://google.de'),
            );
            await expect(actor.states('page')).toHaveURL('https://www.google.de');
        });
    });

    test('DragAndDrop', async ({ actor }) => {
        const page: Page = actor.states('page');

        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/drag_and_drop'),
            Wait.forLoadState('networkidle'),
        );

        // before drag: Box A is on the Left
        await expect(actor.states('page').locator('[id="column-a"] header')).toHaveText('A');

        // execute the drag
        await actor.attemptsTo(
            DragAndDrop.execute(page.locator('[id="column-a"]'), page.locator('[id="column-b"]')),
        );
        // after Drag: Box B is on the Left
        await expect(actor.states('page').locator('[id="column-a"] header')).toHaveText('B');
    });

    test('Check', async ({ actor }) => {
        const page: Page = actor.states('page');

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
        const page: Page = actor.states('page');

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
        const page: Page = actor.states('page');

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
        const page: Page = actor.states('page');

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
        const page: Page = actor.states('page');

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

    test('Wait + Recursive Locators', async ({ actor }) => {
        const page: Page = actor.states('page');

        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/tables'),
            Wait.forLoadState('networkidle'),

            // Locator@[id="table1"] >> tbody tr >> internal:has="text=Conway" >> td:has-text("$50.00")
            // Wait.forSelector(page.locator('[id="table1"]'), { subSelector: [('tbody tr'), { hasText: 'Conway', subSelector: [('td:has-text("$50.00")')] }] }),
            Wait.forSelector(page.locator('[id="table1"]'), { subSelector: [('tbody tr'), { hasText: 'Conway', subSelector: [page.locator('td:has-text("$50.00")')] }] }),
        );
    });

    test('Cookies: Add, Get, Clear', async ({ actor }) => {
        const context: BrowserContext = actor.states('page').context();

        await actor.attemptsTo(
            Navigate.to('https://google.com'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there are cookies to clear
        expect(await context.cookies()).not.toStrictEqual([]);

        // Clear any cookies not added by us
        await actor.attemptsTo(
            Clear.cookies(),
        );

        // assert that cookies are successfully cleared
        expect(await context.cookies()).toStrictEqual([]);

        // Add some cookies
        const cookiesToAdd: Cookie[] = [{
            name: 'cookie1', value: 'someValue', domain: '.google.com', path: '/', expires: 1736932950.42523, httpOnly: true, secure: true, sameSite: 'Lax',
        }, {
            name: 'cookie2', value: 'val', domain: '.google.com', path: '/', expires: 1736932950.42523, httpOnly: true, secure: true, sameSite: 'Lax',
        }];
        await actor.attemptsTo(
            Add.cookies(cookiesToAdd),
        );
        // assert that cookies are successfully added
        expect(await context.cookies()).toStrictEqual(cookiesToAdd);

        // Get the cookies we just added
        const getCookies: Cookie[] = await actor.attemptsTo(
            Get.cookies('https://google.com'),
        );
        // assert that cookies are retrieved successfully
        expect(getCookies).toStrictEqual(cookiesToAdd);
    });

    test('Local storage + Session storage', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://google.com'),
            Wait.forLoadState('networkidle'),

            Set.localStorageItem('localKey', 'localValue'),
            Set.sessionStorageItem('sessionKey', 'sessionValue'),
        );

        // check local storage item
        const local = await actor.attemptsTo(
            Get.localStorageItem('localKey'),
        );
        expect(local).toBe('localValue');

        // check session storage item
        const session = await actor.attemptsTo(
            Get.sessionStorageItem('sessionKey'),
        );
        expect(session).toBe('sessionValue');

        // check for values that are not there
        const localUndefined = await actor.attemptsTo(
            Get.localStorageItem('???'),
        );
        expect(localUndefined).toBeUndefined();

        // check for values that are not there
        const sessionUndefined = await actor.attemptsTo(
            Get.sessionStorageItem('???'),
        );
        expect(sessionUndefined).toBeUndefined();

        // remove local storage item and verify that it was deleted
        const localDeleted = await actor.attemptsTo(
            Remove.localStorageItem('localKey'),
            Get.localStorageItem('localKey'),
        );
        expect(localDeleted).toBeUndefined();

        // remove session storage item and verify that it was deleted
        const sessionDeleted = await actor.attemptsTo(
            Remove.sessionStorageItem('sessionKey'),
            Get.sessionStorageItem('sessionKey'),
        );
        expect(sessionDeleted).toBeUndefined();
    });

    test('Element.visible', async ({ actor }) => {
        const page: Page = actor.states('page');

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
        const page: Page = actor.states('page');

        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/tinymce'),
            Wait.forLoadState('networkidle'),
            Click.on('[aria-label="Bold"]'),
        );

        expect(await actor.asks(
            Element.toBe.enabled(page.locator('[aria-label="Undo"]')),
        )).toBe(true);

        let enabledRes = false;
        try {
            expect(await actor.asks(
                Element.toBe.enabled(page.locator('[aria-label="Redo"]'), { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            enabledRes = true;
        }
        expect(enabledRes).toBeTruthy();

        expect(await actor.asks(
            Element.notToBe.enabled(page.locator('[aria-label="Redo"]')),
        )).toBe(true);

        let notEnabledRes = false;
        try {
            expect(await actor.asks(
                Element.notToBe.enabled(page.locator('[aria-label="Undo"]'), { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            notEnabledRes = true;
        }
        expect(notEnabledRes).toBeTruthy();
    });
});
