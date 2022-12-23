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
import { ResponseBodyType, Response as ResponseType } from '../src/api/types';

type MyActors = {
    actor: Actor;
};

// helper method for the response body verification. to avoid duplicated code.
async function verifyBodies(actor: Actor, response: ResponseType, expectedBody: ResponseBodyType): Promise<void> {
    await actor.asks(
        Response.has.body(response, expectedBody),
    );

    let bodyRes = false;

    try {
        await actor.asks(
            Response.has.body(response, {}),
        );
    } catch (error) {
        bodyRes = true;
    }

    expect(bodyRes).toBeTruthy();

    let notBodyRes = false;

    try {
        await actor.asks(
            Response.hasNot.body(response, expectedBody),
        );
    } catch (error) {
        notBodyRes = true;
    }

    expect(notBodyRes).toBeTruthy();

    await actor.asks(
        Response.hasNot.body(response, {}),
    );
}

const test = base.extend<MyActors>({
    actor: async ({ request }, use) => {
        const actor = Actor.named('TestActor').can(UseAPI.using(request));
        await use(actor);
    },
});

// TODO: implement test with headers
test.describe('Testing screenplay-playwright-js web module', () => {
    test('GET', async ({ actor }) => {
        const response = await actor.attemptsTo(
            Get.from('http://zippopotam.us/us/90210').withResponseBodyFormat('text'),
        );
        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
    });

    // skip POST test until website is back or this test is replaced.
    test.skip('POST', async ({ actor }) => {
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
        expect(response.body).toStrictEqual({});

        const responseWithHeaders = await actor.attemptsTo(
            Delete.from('https://jsonplaceholder.typicode.com/posts/1').withHeaders({
                'Content-type': 'text/plain; charset=UTF-8',
            }),
        );
        expect(responseWithHeaders.status).toBe(200);
        expect(responseWithHeaders.body).toStrictEqual({});
    });

    test('HEAD', async ({ actor }) => {
        const response = await actor.attemptsTo(
            Head.from('https://jsonplaceholder.typicode.com/posts/1'),
        );
        expect(response.status).toBe(200);
        expect(response.body).toBeNull();
    });

    test('Response.statusCode (Question)', async ({ actor }) => {
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

    test('Response.body (Question)', async ({ actor }) => {
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

        await verifyBodies(actor, responseJSON, expectedBodyJSON);

        const responseText = await actor.attemptsTo(
            Get.from('https://jsonplaceholder.typicode.com/posts/1').withResponseBodyFormat('text'),
        );

        // exact spaces and line breaks are necessary! pls don't change this string or else the test fails
        const expectedBodyText = '{\n'
            + '  "userId": 1,\n'
            + '  "id": 1,\n'
            + '  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n'
            + '  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n'
            + '}';

        await verifyBodies(actor, responseText, expectedBodyText);
    });

    test('Response.headers (Question)', async ({ actor }) => {
        const response = await actor.attemptsTo(
            Get.from('http://zippopotam.us/us/90210'),
        );

        const expectedHeaders = {
            'content-type': 'application/json',
            server: 'cloudflare',
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

    test('Response.beenReceivedWithin (Question)', async ({ actor }) => {
        const start = Date.now();

        const response = await actor.attemptsTo(
            Get.from('http://zippopotam.us/us/90210'),
        );

        // expectedReceived is guaranteed to be higher than the response duration
        const expectedReceived = Date.now() - start + 1000;

        await actor.asks(
            Response.has.beenReceivedWithin(response, expectedReceived),
        );

        let receivedRes = false;
        try {
            await actor.asks(
                Response.has.beenReceivedWithin(response, 1),
            );
        } catch (error) {
            receivedRes = true;
        }
        expect(receivedRes).toBeTruthy();

        let notReceivedRes = false;
        try {
            await actor.asks(
                Response.hasNot.beenReceivedWithin(response, expectedReceived),
            );
        } catch (error) {
            notReceivedRes = true;
        }
        expect(notReceivedRes).toBeTruthy();

        await actor.asks(
            Response.hasNot.beenReceivedWithin(response, 1),
        );
    });
});
