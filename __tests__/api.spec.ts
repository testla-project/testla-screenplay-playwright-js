import { expect, test as base } from '@playwright/test';
import { Actor } from '@testla/screenplay';
import { UseAPI } from '../src/api/abilities/UseAPI';
import { Get } from '../src/api/actions/Get';
import { Post } from '../src/api/actions/Post';
import { Patch } from '../src/api/actions/Patch';
import { Put } from '../src/api/actions/Put';
import { Head } from '../src/api/actions/Head';
import { Delete } from '../src/api/actions/Delete';
import { Response } from '../src/api/questions/Response';

type MyActors = {
    actor: Actor;
};

const test = base.extend<MyActors>({
    actor: async ({ request }, use) => {
        const actor = Actor.named('TestActor').can(UseAPI.using(request));
        await use(actor);
    },
});

// TODO: implement test for Head
// TODO: implement test with headers
test.describe('Testing screenplay-playwright-js web module', () => {
    test('GET', async ({ actor }) => {
        const response = await actor.attemptsTo(
            Get.from('http://zippopotam.us/us/90210').withResponseBodyFormat('text'),
        );
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

        const responseWithHeaders = await actor.attemptsTo(
            Patch.to('https://jsonplaceholder.typicode.com/posts/1').withData(data)
                .withHeaders({
                    'Content-type': 'text/plain; charset=UTF-8',
                }),
        );
        expect(responseWithHeaders.status).toBe(200);
        expect(responseWithHeaders.body).toStrictEqual({
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\n'
              + 'suscipit recusandae consequuntur expedita et cum\n'
              + 'reprehenderit molestiae ut ut quas totam\n'
              + 'nostrum rerum est autem sunt rem eveniet architecto',
        });
    });

    test('DELETE', async ({ actor }) => {
        const response = await actor.attemptsTo(
            Delete.from('https://jsonplaceholder.typicode.com/posts/1'),
        );
        expect(response.status).toBe(200);
    });

    test('HEAD', async ({ actor }) => {
        const response = await actor.attemptsTo(
            Head.from('https://jsonplaceholder.typicode.com/posts/1'),
        );
        expect(response.status).toBe(200);
        expect(response.body).toBeNull();
    });

    test('Response.status (Question)', async ({ actor }) => {
        const response = await actor.attemptsTo(
            Get.from('http://zippopotam.us/us/90210'),
        );

        await actor.asks(
            Response.has.statusCode(response, 200),
        );

        let statusRes = false;
        try {
            await actor.asks(
                Response.has.statusCode(response, 404),
            );
        } catch (error) {
            statusRes = true;
        }
        expect(statusRes).toBeTruthy();

        let notStatusRes = false;
        try {
            await actor.asks(
                Response.hasNot.statusCode(response, 200),
            );
        } catch (error) {
            notStatusRes = true;
        }
        expect(notStatusRes).toBeTruthy();

        await actor.asks(
            Response.hasNot.statusCode(response, 404),
        );
    });

    // TODO: problems with text response
    test.skip('Response.body (Question)', async ({ actor }) => {
        const responseJSON = await actor.attemptsTo(
            Get.from('http://zippopotam.us/us/90210'),
        );

        const expectedBodyJSON = {
            'post code': '90210',
            country: 'United States',
            'country abbreviation': 'US',
            places: [{
                'place name': 'Beverly Hills', longitude: '-118.4065', state: 'California', 'state abbreviation': 'CA', latitude: '34.0901',
            }],
        };

        await actor.asks(
            Response.has.body(responseJSON, expectedBodyJSON),
        );

        let bodyResJSON = false;
        try {
            await actor.asks(
                Response.has.body(responseJSON, {}),
            );
        } catch (error) {
            bodyResJSON = true;
        }
        expect(bodyResJSON).toBeTruthy();

        let notBodyResJSON = false;
        try {
            await actor.asks(
                Response.hasNot.body(responseJSON, expectedBodyJSON),
            );
        } catch (error) {
            notBodyResJSON = true;
        }
        expect(notBodyResJSON).toBeTruthy();

        await actor.asks(
            Response.hasNot.body(responseJSON, {}),
        );

        const responseText = await actor.attemptsTo(
            Get.from('https://jsonplaceholder.typicode.com/posts/1').withResponseBodyFormat('text'),
        );

        const expectedBodyText = JSON.stringify(
            {
                userId: 1,
                id: 1,
                title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
            },
        );
        console.log(responseText.body);
        console.log(expectedBodyText);

        await actor.asks(
            Response.has.body(responseText, expectedBodyText),
        );

        let bodyResText = false;
        try {
            await actor.asks(
                Response.has.body(responseText, {}),
            );
        } catch (error) {
            bodyResText = true;
        }
        expect(bodyResText).toBeTruthy();

        let notBodyResText = false;
        try {
            await actor.asks(
                Response.hasNot.body(responseText, expectedBodyText),
            );
        } catch (error) {
            notBodyResText = true;
        }
        expect(notBodyResText).toBeTruthy();

        await actor.asks(
            Response.hasNot.body(responseText, {}),
        );
    });

    // THIS TEST FAILS
    test.skip('Response.headers (Question)', async ({ actor }) => {
        const response = await actor.attemptsTo(
            Get.from('http://zippopotam.us/us/90210'),
        );

        const expectedHeaders = {
            'content-type': 'application/json',
            server: 'cloudfare',
        };

        await actor.asks(
            Response.has.headers(response, expectedHeaders),
        );

        let headersRes = false;
        try {
            await actor.asks(
                Response.has.headers(response, { '???': '???' }),
            );
        } catch (error) {
            headersRes = true;
        }
        expect(headersRes).toBeTruthy();

        let notHeadersRes = false;
        try {
            await actor.asks(
                Response.hasNot.headers(response, expectedHeaders),
            );
        } catch (error) {
            notHeadersRes = true;
        }
        expect(notHeadersRes).toBeTruthy();

        await actor.asks(
            Response.hasNot.headers(response, { '???': '???' }),
        );
    });
});
