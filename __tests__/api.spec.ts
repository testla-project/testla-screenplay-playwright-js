import { expect, test as base } from '@playwright/test';
import { Actor } from '@testla/screenplay';
import { UseAPI } from '../src/api/abilities/UseAPI';
import { Get } from '../src/api/actions/Get';
import { Post } from '../src/api/actions/Post';
import { Patch } from '../src/api/actions/Patch';
import { Put } from '../src/api/actions/Put';
import { Head } from '../src/api/actions/Head';
import { Delete } from '../src/api/actions/Delete';

type MyActors = {
    actor: Actor;
};

const test = base.extend<MyActors>({
    actor: async ({ request }, use) => {
        const actor = Actor.named('TestActor').can(UseAPI.using(request));
        await use(actor);
    },
});

test.describe('Testing screenplay-playwright-js web module', () => {
    test('GET', async ({ actor }) => {
        const response = await actor.attemptsTo(
            Get.from('http://zippopotam.us/us/90210').withResponseBodyFormat('text'),
        );
        console.log(response);
        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
    });

    test('POST', async ({ actor }) => {
        const response = await actor.attemptsTo(
            Post.to('https://ptsv2.com/t/ibcu7-1639386619/post').withData('TEST!').withResponseBodyFormat('text'),
        );
        expect(response.status).toBe(200);
        expect(response.body).toBe('Thank you for this dump. I hope you have a lovely day!');
    });

    test('PUT', async ({ actor }) => {
        const data = {
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1,
        };

        const response = await actor.attemptsTo(
            Put.to('https://jsonplaceholder.typicode.com/posts/1').withData(data),
        );
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(data);
    });

    test('PATCH', async ({ actor }) => {
        const data = {
            userId: 1,
            id: 1,
            title: 'I patched this title!',
            body: 'I patched this body!',
        };

        const response = await actor.attemptsTo(
            Patch.to('https://jsonplaceholder.typicode.com/posts/1').withData(data),
        );
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(data);
    });

    test('DELETE', async ({ actor }) => {
        const response = await actor.attemptsTo(
            Delete.from('https://jsonplaceholder.typicode.com/posts/1'),
        );
        expect(response.status).toBe(200);
    });
});
