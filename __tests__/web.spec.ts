/* eslint-disable no-restricted-syntax */
import {
    BrowserContext, Cookie, expect, test as base,
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
import { Count } from '../src/web/actions/Count';

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
        // To get access of the page object
        // const page: Page = BrowseTheWeb.as(actor).getPage();

        // await page.coverage.startJSCoverage();
        await test.step('Navigate to playwright page', async () => {
            await actor.attemptsTo(
                Navigate.to('https://google.de'),
            );
            await expect(actor.states('page')).toHaveURL('https://www.google.de');
        });
    });

    test('DragAndDrop', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/drag_and_drop'),
            Wait.forLoadState('networkidle'),
        );

        // before drag: Box A is on the Left
        await expect(actor.states('page').locator('[id="column-a"] header')).toHaveText('A');

        // execute the drag
        await actor.attemptsTo(
            DragAndDrop.execute('[id="column-a"]', '[id="column-b"]'),
        );
        // after Drag: Box B is on the Left
        await expect(actor.states('page').locator('[id="column-a"] header')).toHaveText('B');
    });

    test('Check', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/checkboxes'),
            Wait.forLoadState('networkidle'),
            Check.element('//input[1]'),
            Check.element('//input[2]'),
        );
        // assertion
        await expect(actor.states('page').locator('//input[1]')).toBeChecked();
        await expect(actor.states('page').locator('//input[2]')).toBeChecked();
    });

    test('Click', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/add_remove_elements/'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there is no button before we add it with our Click
        await expect(actor.states('page').locator('[class="added-manually"]')).toHaveCount(0);

        await actor.attemptsTo(
            Click.on('button', { hasText: 'Add Element' }),
        );
        // assert that the button is here after our Click
        await expect(actor.states('page').locator('[class="added-manually"]')).toHaveCount(1);
    });

    test('Fill+Type', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/login'),
            Wait.forLoadState('networkidle'),
            Fill.in('[id="username"]', 'tomsmith'),
            Type.in('[id="password"]', 'SuperSecretPassword!'),
            Click.on('[class="radius"]'),
            Wait.forLoadState('networkidle'),
        );
        // assert that the login worked
        await expect(actor.states('page')).toHaveURL('https://the-internet.herokuapp.com/secure');
    });

    test('Hover', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/hovers'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there is no info before the hover
        await expect(actor.states('page').locator('[href="/users/1"]')).not.toBeVisible();

        await actor.attemptsTo(
            Hover.over('div.figure:nth-child(3) > img:nth-child(1)'),
        );
        // assert that the info is now visible after hover
        await expect(actor.states('page').locator('[href="/users/1"]')).toBeVisible();
    });

    test('Press', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/key_presses'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there is nothing in the result box
        await expect(actor.states('page').locator('[id="result"]')).toHaveText('');

        await actor.attemptsTo(
            Click.on('[id="target"]'),
            Press.key('a'),
        );
        // assert that the pressed button was recognized
        await expect(actor.states('page').locator('[id="result"]')).toHaveText('You entered: A');
    });

    test('Get.element and Get.elements', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/checkboxes'),
            Wait.forLoadState('networkidle'),
        );

        // assert that there is nothing in the result box
        await expect(await actor.attemptsTo(Get.element('[type="checkbox"]'))).toHaveCount(1);
        await expect((await actor.attemptsTo(Get.elements('[type="checkbox"]'))).length).toBe(2);

        await expect(await actor.attemptsTo(Get.element('h3'))).toHaveCount(1);
        await expect((await actor.attemptsTo(Get.elements('h3'))).length).toBe(1);
    });

    test('Count', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/checkboxes'),
            Wait.forLoadState('networkidle'),
        );

        await expect(await actor.attemptsTo(Count.elements('h6'))).toBe(0);
        await expect(await actor.attemptsTo(Count.elements('h3'))).toBe(1);
        await expect(await actor.attemptsTo(Count.elements('[type="checkbox"]'))).toBe(2);
    });

    test('Wait + Recursive Locators', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/tables'),
            Wait.forLoadState('networkidle'),

            Wait.forSelector('[id="table1"]', { subSelector: ['tbody tr', { hasText: 'Conway', subSelector: ['td:has-text("$50.00")'] }] }),
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
            name: 'cookie1', value: 'someValue', domain: '.google.com', path: '/', expires: 1700269944, httpOnly: true, secure: true, sameSite: 'Lax',
        }, {
            name: 'cookie2', value: 'val', domain: '.google.com', path: '/', expires: 1700269944, httpOnly: true, secure: true, sameSite: 'Lax',
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
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/tables'),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Element.toBe.visible('h3', { hasText: 'Data Tables' }),
        )).toBe(true);

        let visibleRes = false;
        try {
            expect(await actor.asks(
                Element.toBe.visible('h3', { hasText: 'this does not exist', timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            visibleRes = true;
        }
        expect(visibleRes).toBeTruthy();

        expect(await actor.asks(
            Element.notToBe.visible('h3', { hasText: 'this does not exist' }),
        )).toBe(true);

        let notVisibleRes = false;
        try {
            expect(await actor.asks(
                Element.notToBe.visible('h3', { hasText: 'Data Tables', timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            notVisibleRes = true;
        }
        expect(notVisibleRes).toBeTruthy();
    });

    test('Element.enabled', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/tinymce'),
            Wait.forLoadState('networkidle'),
            Click.on('[aria-label="Bold"]'),
        );

        expect(await actor.asks(
            Element.toBe.enabled('[aria-label="Undo"]'),
        )).toBe(true);

        let enabledRes = false;
        try {
            expect(await actor.asks(
                Element.toBe.enabled('[aria-label="Redo"]', { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            enabledRes = true;
        }
        expect(enabledRes).toBeTruthy();

        expect(await actor.asks(
            Element.notToBe.enabled('[aria-label="Redo"]'),
        )).toBe(true);

        let notEnabledRes = false;
        try {
            expect(await actor.asks(
                Element.notToBe.enabled('[aria-label="Undo"]', { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            notEnabledRes = true;
        }
        expect(notEnabledRes).toBeTruthy();
    });

    test('Element.text', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/tables'),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Element.toHave.text('h3', 'Data Tables'),
        )).toBe(true);

        let textRes = false;
        try {
            expect(await actor.asks(
                Element.toHave.text('h3', 'this text does not exist', { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            textRes = true;
        }
        expect(textRes).toBeTruthy();

        expect(await actor.asks(
            Element.notToHave.text('h3', /[0-9]/), // RegExp that does not exist
        )).toBe(true);

        let notTextRes = false;
        try {
            expect(await actor.asks(
                Element.notToHave.text('h3', ['Data Tables'], { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            notTextRes = true;
        }
        expect(notTextRes).toBeTruthy();
    });

    test('Element.values', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/login'),
            Wait.forLoadState('networkidle'),
        );

        // fill username field with string
        await actor.attemptsTo(
            Fill.in('[id="username"]', 'test'),
        );
        // toBe.value test: expect the value of the username field to be the string 'test'
        expect(await actor.asks(
            Element.toHave.value('[id="username"]', 'test'),
        )).toBe(true);

        // toBe.value test: expect the question to fail if the expected string is not correct
        let textRes = false;
        try {
            expect(await actor.asks(
                Element.toHave.value('[id="username"]', 'this value is wrong', { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            textRes = true;
        }
        expect(textRes).toBeTruthy();

        expect(await actor.asks(
            Element.notToHave.value('[id="username"]', 'this value is wrong'),
        )).toBe(true);

        let notTextRes = false;
        try {
            expect(await actor.asks(
                Element.notToHave.value('[id="username"]', /test/, { timeout: 1000 }), // RegExp for the string 'test'
            )).toBe(true);
        } catch (error) {
            notTextRes = true;
        }
        expect(notTextRes).toBeTruthy();
    });

    test('Element.checked', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/checkboxes'),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Element.toBe.checked('[type="checkbox"]:nth-of-type(2)'),
        )).toBe(true);

        let enabledRes = false;
        try {
            expect(await actor.asks(
                Element.toBe.checked('[type="checkbox"]:nth-of-type(1)', { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            enabledRes = true;
        }
        expect(enabledRes).toBeTruthy();

        expect(await actor.asks(
            Element.notToBe.checked('[type="checkbox"]:nth-of-type(1)'),
        )).toBe(true);

        let notEnabledRes = false;
        try {
            expect(await actor.asks(
                Element.notToBe.checked('[type="checkbox"]:nth-of-type(2)', { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            notEnabledRes = true;
        }
        expect(notEnabledRes).toBeTruthy();
    });

    test('Element.count', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/checkboxes'),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Element.toHave.count('[type="checkbox"]', 2),
        )).toBe(true);

        let enabledRes = false;
        try {
            expect(await actor.asks(
                Element.toHave.count('h3', 2, { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            enabledRes = true;
        }
        expect(enabledRes).toBeTruthy();

        expect(await actor.asks(
            Element.notToHave.count('[type="checkbox"]', 1),
        )).toBe(true);

        let notEnabledRes = false;
        try {
            expect(await actor.asks(
                Element.notToHave.count('h3', 1, { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            notEnabledRes = true;
        }
        expect(notEnabledRes).toBeTruthy();
    });

    test('Element.minCount', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/checkboxes'),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Element.toHave.minCount('[type="checkbox"]', 1),
            Element.toHave.minCount('[type="checkbox"]', 2),
        )).toBe(true);

        let enabledRes = false;
        try {
            expect(await actor.asks(
                Element.toHave.minCount('h3', 2, { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            enabledRes = true;
        }
        expect(enabledRes).toBeTruthy();

        expect(await actor.asks(
            Element.notToHave.minCount('[type="checkbox"]', 3),
        )).toBe(true);

        let notEnabledRes = false;
        try {
            expect(await actor.asks(
                Element.notToHave.minCount('h3', 1, { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            notEnabledRes = true;
        }
        expect(notEnabledRes).toBeTruthy();
    });
});
