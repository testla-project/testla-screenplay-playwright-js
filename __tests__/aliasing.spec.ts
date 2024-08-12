import { expect, test as base } from '@playwright/test';
import { Actor } from '@testla/screenplay';
import { UseAPI } from '../src/api/abilities/UseAPI';
import { Get } from '../src/api/actions/Get';
import { BrowseTheWeb, Navigate } from '../src/web';
import { Element } from '../src/web/questions/Element';

const ALIAS = 'alias';

type MyActors = {
    actor: Actor;
};

const test = base.extend<MyActors>({
    actor: async ({ request, browser }, use) => {
        const context = await browser.newContext();
        const page1 = await context.newPage();
        const page2 = await context.newPage();
        const actor = Actor.named('TestActor')
            .can(UseAPI.using(request))
            .can(UseAPI.using(request).withAlias(ALIAS))
            .can(BrowseTheWeb.using(page1))
            .can(BrowseTheWeb.using(page2).withAlias(ALIAS));
        await use(actor);
    },
});

test.describe('Testing screenplay-playwright-js ability aliasing', () => {
    test('UseAPI', async ({ actor }) => {
        const response = await actor.attemptsTo(
            Get.from('http://zippopotam.us/us/90210').withResponseBodyFormat('text'),
        );
        expect(response.status).toBe(200);

        const response2 = await actor.attemptsTo(
            Get.from('http://zippopotam.us/us/90210').withResponseBodyFormat('text').withAbilityAlias(ALIAS),
        );
        expect(response2.status).toBe(200);
    });

    test('BrowseTheWeb', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://google.de'),
        );
        await expect(BrowseTheWeb.as(actor).getPage()).toHaveURL('https://www.google.de');

        await actor.attemptsTo(
            Navigate.to('https://google.com').withAbilityAlias(ALIAS),
        );
        await expect(BrowseTheWeb.as(actor, ALIAS).getPage()).toHaveURL('https://www.google.com');
    });

    test('BrowseTheWeb - Question with aliasing', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('https://the-internet.herokuapp.com/tables').withAbilityAlias(ALIAS),
        );

        await actor.asks(
            Element.toHave.text('h3', 'Data Tables').withAbilityAlias(ALIAS),
        );
    });
});
