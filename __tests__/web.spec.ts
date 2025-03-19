/* eslint-disable no-restricted-syntax */
import {
    BrowserContext, Cookie,
    test as base,
    expect,
} from '@playwright/test';
import { Actor } from '@testla/screenplay';
import * as fs from 'fs';
import { BrowseTheWeb } from '../src/web/abilities/BrowseTheWeb';
import { Add } from '../src/web/actions/Add';
import { Check } from '../src/web/actions/Check';
import { Clear } from '../src/web/actions/Clear';
import { Click } from '../src/web/actions/Click';
import { DragAndDrop } from '../src/web/actions/DragAndDrop';
import { Fill } from '../src/web/actions/Fill';
import { Get } from '../src/web/actions/Get';
import { Hover } from '../src/web/actions/Hover';
import { Navigate } from '../src/web/actions/Navigate';
import { Press } from '../src/web/actions/Press';
import { Remove } from '../src/web/actions/Remove';
import { Set } from '../src/web/actions/Set';
import { Type } from '../src/web/actions/Type';
import { Wait } from '../src/web/actions/Wait';
import { Element } from '../src/web/questions/Element';
import { Count } from '../src/web/actions/Count';
import { Download } from '../src/web/actions/Download';
import { Page } from '../src/web/questions/Page';

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

// TODO: implement test for DoubleClick
// TODO: test different details between Fill and Type
test.describe('Testing screenplay-playwright-js web module', () => {
    test('Navigate', async ({ actor }) => {
        await test.step('Navigate to playwright page', async () => {
            await actor.attemptsTo(
                Navigate.to('https://google.de'),
            );
            await expect(BrowseTheWeb.as(actor).getPage()).toHaveURL('https://www.google.de');
        });
    });

    test('DragAndDrop', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/drag_and_drop'),
            Wait.forLoadState('networkidle'),
        );

        // before drag: Box A is on the Left
        await expect(BrowseTheWeb.as(actor).getPage().locator('[id="column-a"] header')).toHaveText('A');

        // execute the drag
        await actor.attemptsTo(
            DragAndDrop.execute('[id="column-a"]', '[id="column-b"]'),
        );
        // after Drag: Box B is on the Left
        await expect(BrowseTheWeb.as(actor).getPage().locator('[id="column-a"] header')).toHaveText('B');
    });

    test('Check', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/checkboxes'),
            Wait.forLoadState('networkidle'),
            Check.element('//input[1]'),
            Check.element('//input[2]'),
        );
        // assertion
        await expect(BrowseTheWeb.as(actor).getPage().locator('//input[1]')).toBeChecked();
        await expect(BrowseTheWeb.as(actor).getPage().locator('//input[2]')).toBeChecked();
    });

    test('Click', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/add_remove_elements/'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there is no button before we add it with our Click
        await expect(BrowseTheWeb.as(actor).getPage().locator('[class="added-manually"]')).toHaveCount(0);

        await actor.attemptsTo(
            Click.on('button', { hasText: 'Add Element' }),
        );
        // assert that the button is here after our Click
        await expect(BrowseTheWeb.as(actor).getPage().locator('[class="added-manually"]')).toHaveCount(1);
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
        await expect(BrowseTheWeb.as(actor).getPage()).toHaveURL('https://the-internet.herokuapp.com/secure');
    });

    test('Hover', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/hovers'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there is no info before the hover
        await expect(BrowseTheWeb.as(actor).getPage().locator('[href="/users/1"]')).not.toBeVisible();

        await actor.attemptsTo(
            Hover.over('div.figure:nth-child(3) > img:nth-child(1)'),
        );
        // assert that the info is now visible after hover
        await expect(BrowseTheWeb.as(actor).getPage().locator('[href="/users/1"]')).toBeVisible();
    });

    test('Press', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/key_presses'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there is nothing in the result box
        await expect(BrowseTheWeb.as(actor).getPage().locator('[id="result"]')).toHaveText('');

        await actor.attemptsTo(
            Click.on('[id="target"]'),
            Press.key('a'),
        );
        // assert that the pressed button was recognized
        await expect(BrowseTheWeb.as(actor).getPage().locator('[id="result"]')).toHaveText('You entered: A');
    });

    test('Get.element and Get.elements', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/checkboxes'),
            Wait.forLoadState('networkidle'),
        );

        // more than 1 element to find
        await expect(await actor.attemptsTo(Get.element('[type="checkbox"]'))).toHaveCount(1);
        await expect((await actor.attemptsTo(Get.elements('[type="checkbox"]'))).length).toBe(2);

        // exact 1 element to find
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

    test('PressSequentially', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/key_presses'),
            Wait.forLoadState('networkidle'),
        );
        // assert that there is nothing in the result box
        await expect(BrowseTheWeb.as(actor).getPage().locator('[id="result"]')).toHaveText('');

        await actor.attemptsTo(
            Press.sequentially('[id="target"]', 'abc'),
        );
        // assert that the pressed button was recognized
        await expect(BrowseTheWeb.as(actor).getPage().locator('[id="result"]')).toHaveText('You entered: C');
    });

    test('Handle iFrames', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/iframe'),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Element.toBe.visible('#tinymce', { hasText: 'Your content goes here.' }).inFrame('#mce_0_ifr'),
        )).toBe(true);
    });

    test('Handle nested Frames', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/nested_frames'),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Element.toBe.visible('#content', { hasText: 'MIDDLE' }).inFrame('[name="frame-top"]').inFrame('[name="frame-middle"]'),
        )).toBe(true);
    });

    test('Wait + Recursive Locators', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/tables'),
            Wait.forLoadState('networkidle'),

            Wait.forSelector('[id="table1"]', { subSelector: ['tbody tr', { hasText: 'Conway', subSelector: ['td:has-text("$50.00")'] }] }),
        );
    });

    test('Cookies: Add, Get, Clear', async ({ actor }) => {
        const context: BrowserContext = BrowseTheWeb.as(actor).getPage().context();
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
        // const ENABLED_ELEMENT = '[aria-label="Undo"]';
        // const DISABLED_ELEMENT = '[aria-label="Redo"]';
        // const URL = 'https://the-internet.herokuapp.com/tinymce';
        // or
        const ENABLED_ELEMENT = '#checkbox input[type="checkbox"]';
        const DISABLED_ELEMENT = '#input-example input[type="text"]';
        const URL = 'https://the-internet.herokuapp.com/dynamic_controls';

        await actor.attemptsTo(
            Navigate.to(URL),
            Wait.forLoadState('networkidle'),
            // Click.on('[aria-label="Bold"]'),
        );

        expect(await actor.asks(
            Element.toBe.enabled(ENABLED_ELEMENT),
        )).toBe(true);

        let enabledRes = false;
        try {
            expect(await actor.asks(
                Element.toBe.enabled(DISABLED_ELEMENT, { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            enabledRes = true;
        }
        expect(enabledRes).toBeTruthy();

        expect(await actor.asks(
            Element.notToBe.enabled(DISABLED_ELEMENT),
        )).toBe(true);

        let notEnabledRes = false;
        try {
            expect(await actor.asks(
                Element.notToBe.enabled(ENABLED_ELEMENT, { timeout: 1000 }),
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

    test('Element.value', async ({ actor }) => {
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

    // the download page contents change a lot
    // thus keeping a few options in place
    // const DOWNLOAD_FILENAME = 'Hi.txt';
    // const DOWNLOAD_FILECONTENT = '';
    // or
    const DOWNLOAD_FILENAME = 'test-file.txt';
    const DOWNLOAD_FILECONTENT = 'Test file';
    // or
    // const DOWNLOAD_FILENAME = 'newFile.txt';
    // const DOWNLOAD_FILECONTENT = 'First file ';

    test('Download File', async ({ actor }) => {
        const res = await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/download'),
            Wait.forLoadState('networkidle'),
            Download.file(`"${DOWNLOAD_FILENAME}"`),
        );
        expect(res).toBe(true);
    });

    test('Download File with Path', async ({ actor }) => {
        const downloadPath = './';
        const downloadFileName = 'download.txt';
        const filePath = `${downloadPath}${downloadFileName}`;
        const res = await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/download'),
            Wait.forLoadState('networkidle'),
            Download.file(`"${DOWNLOAD_FILENAME}"`, { filepath: downloadPath, filename: downloadFileName }),
        );
        expect(res).toBe(true);
        const fileName = filePath.split('\\')?.pop()?.split('/').pop();
        // Validate the filename
        expect(fileName).toBe(downloadFileName);
        // Validate the content of the file
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        expect(fileContent).toBe(DOWNLOAD_FILECONTENT);
    });

    test('Wait.forUrl', async ({ actor }) => {
        const URL = 'https://the-internet.herokuapp.com';
        await actor.attemptsTo(
            Navigate.to(URL),
            Wait.forUrl(URL),
        );
    });

    test('Page.url', async ({ actor }) => {
        const URL_A = 'https://the-internet.herokuapp.com';
        const URL_B = 'https://the-internet.herokuapp.com/tables';
        await actor.attemptsTo(
            Navigate.to(URL_A),
            Wait.forLoadState('networkidle'),
        );

        expect(await actor.asks(
            Page.toHave.url(URL_A),
        )).toBe(true);

        let urlRes = false;
        try {
            expect(await actor.asks(
                Page.toHave.url(URL_B, { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            urlRes = true;
        }
        expect(urlRes).toBeTruthy();

        expect(await actor.asks(
            Page.notToHave.url(URL_B), // RegExp that does not exist
        )).toBe(true);

        let notUrlRes = false;
        try {
            expect(await actor.asks(
                Page.notToHave.url(URL_A, { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            notUrlRes = true;
        }
        expect(notUrlRes).toBeTruthy();
    });
});
