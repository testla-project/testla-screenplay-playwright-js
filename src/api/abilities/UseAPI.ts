import { expect, APIRequestContext, APIResponse } from '@playwright/test';
import { Ability, Actor } from '@testla/screenplay';
import { RequestMethod, RequestMethodType } from '../constants';
import {
    Response, ResponseBodyFormat, ResponseBodyType,
} from '../types';

export class UseAPI extends Ability {
    private constructor(private requestContext: APIRequestContext) {
        super();
    }

    /**
     * Get the request context object
     *
     * @returns {ApiRequestContext} requestContext the api request context
     */
    public getRequestContext(): APIRequestContext {
        return this.requestContext;
    }

    /**
     * Initialize this Ability by passing an already existing Playwright APIRequestContext object.
     *
     * @param {APIRequestContext} requestContext the Playwright APIRequestContext that will be used to send REST requests.
     * @returns {UseAPI} UseApi object
     */
    public static using(requestContext: APIRequestContext) {
        return new UseAPI(requestContext);
    }

    /**
     * Use this Ability as an Actor.
     *
     * @param {Actor} actor the actor object
     * @param {string} alias defined the alias to be used for the given ability
     * @returns {UseAPI} The ability to use the API as the actor
     */
    public static as(actor: Actor, alias?: string): UseAPI {
        return actor.withAbilityTo(this, alias) as UseAPI;
    }

    /**
     * Send a HTTP request (GET, POST, PATCH, PUT, HEAD or DELETE) to the specified url. Headers and data can also be sent.
     *
     * @param {RequestMethodType} method GET, POST, PATCH, PUT, HEAD or DELETE.
     * @param {string} url the full URL to the target.
     * @param {any} headers (optional) the headers object.
     * @param {ResponseBodyFormat} responseFormat (optional) specify the desired format the response body should be in.
     * @param {any} data (optional) the data to be sent.
     * @returns {Response} Promise<Response> a Response object consisting of status, body and headers.
     */
    public async sendRequest(method: RequestMethodType, url: string, headers?: any, responseFormat?: ResponseBodyFormat, data?: any): Promise<Response> {
        const options = {
            headers,
            data,
        };

        // track time before sending request
        const startTime = Date.now();

        let res: APIResponse;
        switch (method) {
            case RequestMethod.GET:
                res = await this.requestContext.get(url, options);
                break;
            case RequestMethod.POST:
                res = await this.requestContext.post(url, options);
                break;
            case RequestMethod.PATCH:
                res = await this.requestContext.patch(url, options);
                break;
            case RequestMethod.PUT:
                res = await this.requestContext.put(url, options);
                break;
            case RequestMethod.HEAD:
                res = await this.requestContext.head(url, options);
                break;
            case RequestMethod.DELETE:
                res = await this.requestContext.delete(url, options);
                break;

            default:
                throw new Error('Error: HTTP method not supported.');
        }

        let resBody;
        if (responseFormat === 'text') {
            resBody = await res.text();
        } else if (responseFormat === 'buffer') {
            resBody = await res.body();
        } else if (responseFormat === 'none') {
            resBody = null;
        } else {
            resBody = await res.json();
        }

        // track time after receiving response
        const endTime = Date.now();

        return Promise.resolve({
            status: res.status(),
            body: resBody,
            headers: res.headers(),
            duration: endTime - startTime,
        });
    }

    /**
     * Verify if the given status is equal or unequal to the given response's status.
     *
     * @param mode the result to check for.
     * @param response the response to check.
     * @param status the status to check.
     * @returns true if the status is equal/unequal as expected.
     */
    // eslint-disable-next-line class-methods-use-this
    public async checkStatus(response: Response, status: number, mode: 'equal' | 'unequal'): Promise<boolean> {
        expect(response.status === status).toBe(mode === 'equal');
        return Promise.resolve(true);
    }

    /**
     * Verify if the given body is equal or unequal to the given response's body.
     *
     * @param mode the result to check for.
     * @param response the response to check.
     * @param body the body to check.
     * @returns true if the body equal/unequal as expected.
     */
    // eslint-disable-next-line class-methods-use-this
    public async checkBody(response: Response, body: ResponseBodyType, mode: 'equal' | 'unequal'): Promise<boolean> {
        if (typeof response.body === 'string' && typeof body === 'string') {
            // response body is plain text -> can check for string equality
            expect(response.body === body).toBe(mode === 'equal');
            return Promise.resolve(true);
        } if (typeof response.body === 'object' && typeof body === 'object') {
            // check for buffer
            if (Buffer.isBuffer(response.body) && Buffer.isBuffer(body)) {
                expect(response.body.equals(body)).toBe(mode === 'equal');
                return Promise.resolve(true);
            }
            if (Buffer.isBuffer(response.body) || Buffer.isBuffer(body)) {
                // response.body and body do not have same type -> bodies are unequal
                expect(mode === 'unequal').toBe(true);
                return Promise.resolve(true);
            }
            // response body is in json format OR null -> can check with JSON.stringify
            expect(JSON.stringify(response.body) === JSON.stringify(body)).toBe(mode === 'equal');
            return Promise.resolve(true);
        }
        // response.body and body do not have same type -> bodies are unequal
        expect(mode === 'unequal').toBe(true);
        return Promise.resolve(true);
    }

    /**
     * Verify if the given headers are included/excluded in the given response. (headers should be a subset of response.headers)
     *
     * @param mode the result to check for.
     * @param response the response to check.
     * @param headers the headers to check.
     * @returns true if the headers are is included/excluded as expected.
     */
    // eslint-disable-next-line class-methods-use-this
    public async checkHeaders(response: Response, headers: {[key: string]: string | undefined }, mode: 'included' | 'excluded'): Promise<boolean> {
        const allResponseHeaderKeys = Object.keys(response.headers);
        expect(
            Object.entries(headers).every((header) => allResponseHeaderKeys.includes(header[0]) // lookup that every header key of headers is inside response.headers
            && (header[1] === undefined || response.headers[header[0]] === header[1])), // either header value is undefined -> value doesn't interest us or we check the value for equality
        ).toBe(mode === 'included');
        return Promise.resolve(true);
    }

    /**
     * Verify if the reponse (including receiving body) was received within a given duration or not.
     *
     * @param mode the result to check for.
     * @param response the response to check
     * @param duration expected duration (in milliseconds) not to be exceeded
     * @returns true if response was received within given duration, false otherwise
     */
    // eslint-disable-next-line class-methods-use-this
    public checkDuration(response: Response, duration: number, mode: 'lessOrEqual' | 'greater'): Promise<boolean> {
        expect(response.duration <= duration).toBe(mode === 'lessOrEqual');
        return Promise.resolve(true);
    }
}
