import { Ability, Actor } from '@testla/screenplay';
import { APIRequestContext, APIResponse } from 'playwright';
import { RequestMethod, REQUEST_METHOD } from '../constants';
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
     * @returns ApiRequestContext
     */
    public getRequestContext(): APIRequestContext {
        return this.requestContext;
    }

    /**
     * Initialize this Ability by passing an already existing Playwright APIRequestContext object.
     *
     * @param requestContext the Playwright APIRequestContext that will be used to send REST requests.
     * @returns UseAPI
     */
    public static using(requestContext: APIRequestContext) {
        return new UseAPI(requestContext);
    }

    /**
     * Use this Ability as an Actor.
     *
     * @param actor
     * @returns UseAPI
     */
    public static as(actor: Actor): UseAPI {
        return actor.withAbilityTo(this) as UseAPI;
    }

    /**
     * Send a HTTP request (GET, POST, PATCH, PUT, HEAD or DELETE) to the specified url. Headers and data can also be sent.
     *
     * @param method GET, POST, PATCH, PUT, HEAD or DELETE.
     * @param url the full URL to the target.
     * @param headers (optional) the headers object.
     * @param responseFormat (optional) specify the desired format the response body should be in.
     * @param data (optional) the data to be sent.
     * @returns a Response object consisting of status, body and headers.
     */
    public async sendRequest(method: RequestMethod, url: string, headers?: any, responseFormat?: ResponseBodyFormat, data?: any): Promise<Response> {
        const options = {
            headers,
            data,
        };

        let res: APIResponse;
        switch (method) {
            case REQUEST_METHOD.GET:
                res = await this.requestContext.get(url, options);
                break;
            case REQUEST_METHOD.POST:
                res = await this.requestContext.post(url, options);
                break;
            case REQUEST_METHOD.PATCH:
                res = await this.requestContext.patch(url, options);
                break;
            case REQUEST_METHOD.PUT:
                res = await this.requestContext.put(url, options);
                break;
            case REQUEST_METHOD.HEAD:
                res = await this.requestContext.head(url, options);
                break;
            case REQUEST_METHOD.DELETE:
                res = await this.requestContext.delete(url, options);
                break;

            default:
                throw new Error('Error: HTTP method not supported.');
        }

        let resBody;
        if (responseFormat === 'text') {
            resBody = await res.text();
        } else if (responseFormat === 'none') {
            resBody = null;
        } else {
            resBody = await res.json();
        }

        return Promise.resolve({
            status: res.status(),
            body: resBody,
            headers: res.headers(),
        });
    }

    /**
     * Verify if the given status is equal to the given response's status.
     *
     * @param response the response to check
     * @param status the status to check
     * @returns true if the status is equal, false otherwise
     */
    // eslint-disable-next-line class-methods-use-this
    public checkStatus(response: Response, status: number): Promise<boolean> {
        return Promise.resolve(response.status === status);
    }

    /**
     * Verify if the given body is equal to the given response's body.
     *
     * @param response the response to check
     * @param body the body to check
     * @returns true if the body is equal, false otherwise
     */
    // eslint-disable-next-line class-methods-use-this
    public checkBody(response: Response, body: ResponseBodyType): Promise<boolean> {
        if (typeof response.body === 'string' && typeof body === 'string') {
            // response body is plain text -> can check for string equality
            return Promise.resolve(response.body === body);
        } if (typeof response.body === 'object' && typeof body === 'object') {
            // response body is in json format OR null -> can check with JSON.stringify
            return Promise.resolve(JSON.stringify(response.body) === JSON.stringify(body));
        }
        // response.body and body do not have same type -> return false
        return Promise.resolve(false);
    }

    /**
     * Verify if the given headers are included in the given response.
     *
     * @param response the response to check
     * @param headers the headers to check
     * @returns true if the headers are included, false otherwise
     */
    // eslint-disable-next-line class-methods-use-this
    public checkHeaders(response: Response, headers: {[key: string]: string | undefined }): Promise<boolean> {
        const allResponseHeaderKeys = Object.keys(response.headers);
        return Promise.resolve(Object.entries(headers).every((header) => allResponseHeaderKeys.includes(header[0]) // lookup that header key is available
            && (header[1] === undefined || response.headers[header[0]] === header[1]))); // either header value is undefined -> value doesn't interest us or we check the value for equality
    }
}
