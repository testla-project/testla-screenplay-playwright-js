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
import { Clear } from '../src/web/actions/Clear';
import { Add } from '../src/web/actions/Add';
import { Get } from '../src/web/actions/Get';
import { Set } from '../src/web/actions/Set';
import { Remove } from '../src/web/actions/Remove';
import { Sleep } from '../src/shared/actions/Sleep';

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

test.describe('Testing screenplay-playwright-js web module', () => {
    test('Navigate', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://google.de'),
        );
        await expect(actor.states('page')).toHaveURL('https://www.google.de');
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
        expect(await actor.states('page').locator('[class="added-manually"]').count()).toEqual(0);

        await actor.attemptsTo(
            Click.on('button', { hasText: 'Add Element' }),
            Sleep.for(2000),
        );
        // assert that the button is here after our Click
        await expect(await actor.states('page').locator('[class="added-manually"]')).toBeEnabled();
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
        await expect(await actor.states('page').locator('[href="/users/1"]')).not.toBeVisible();

        await actor.attemptsTo(
            Hover.over('div.figure:nth-child(3) > img:nth-child(1)'),
        );
        // assert that the info is now visible after hover
        await expect(await actor.states('page').locator('[href="/users/1"]')).toBeVisible();
    });

    test('Cookies: Add, Get, Clear', async ({ actor }) => {
        const context: BrowserContext = actor.states('page').context();

        await actor.attemptsTo(
            Navigate.to('https://google.com'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there are cookies to clear
        expect(await context.cookies()).not.toStrictEqual([]);
        // console.log(await context.cookies());

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
        expect(localDeleted).toBe(undefined);

        // remove session storage item and verify that it was deleted
        const sessionDeleted = await actor.attemptsTo(
            Remove.sessionStorageItem('sessionKey'),
            Get.sessionStorageItem('sessionKey'),
        );
        expect(sessionDeleted).toBe(undefined);
    });
});
