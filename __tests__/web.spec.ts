import { expect, test as base } from '@playwright/test';
import { Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../src/web/abilities/BrowseTheWeb';
import { Navigate } from '../src/web/actions/Navigate';
import { Wait } from '../src/web/actions/Wait';
import { Click } from '../src/web/actions/Click';
import { Fill } from '../src/web/actions/Fill';
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

test.describe('Testing screenplay-playwright-js web module', () => {
    test('Element.visible + Element.enabled', async ({ actor }) => {
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
            Element.toBe.text('h3', 'Data Tables'),
        )).toBe(true);

        let textRes = false;
        try {
            expect(await actor.asks(
                Element.toBe.text('h3', 'this text does not exist', { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            textRes = true;
        }
        expect(textRes).toBeTruthy();

        expect(await actor.asks(
            Element.notToBe.text('h3', /[0-9]/), // RegExp that does not exist
        )).toBe(true);

        let notTextRes = false;
        try {
            expect(await actor.asks(
                Element.notToBe.text('h3', ['Data Tables'], { timeout: 1000 }),
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
            Element.toBe.value('[id="username"]', 'test'),
        )).toBe(true);

        // toBe.value test: expect the question to fail if the expected string is not correct
        let textRes = false;
        try {
            expect(await actor.asks(
                Element.toBe.value('[id="username"]', 'this value is wrong', { timeout: 1000 }),
            )).toBe(true);
        } catch (error) {
            textRes = true;
        }
        expect(textRes).toBeTruthy();

        expect(await actor.asks(
            Element.notToBe.value('[id="username"]', 'this value is wrong'),
        )).toBe(true);

        let notTextRes = false;
        try {
            expect(await actor.asks(
                Element.notToBe.value('[id="username"]', /test/, { timeout: 1000 }), // RegExp for the string 'test'
            )).toBe(true);
        } catch (error) {
            notTextRes = true;
        }
        expect(notTextRes).toBeTruthy();
    });
});
