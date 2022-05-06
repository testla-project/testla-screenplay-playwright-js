import { Ability, Actor } from '@testla/screenplay';
import { APIRequestContext, APIResponse } from 'playwright';
import { RequestMethod, REQUEST_METHOD } from '../constants';
import { Headers, Response, ResponseBodyFormat } from '../types';

export class UseAPI extends Ability {
    private constructor(private requestContext: APIRequestContext) {
        super();
    }

    /**
     * Initialize this Ability by passing an already existing Playwright APIRequestContext object.
     *
     * @param requestContext the Playwright APIRequestContext that will be used to send REST requests.
     */
    public static using(requestContext: APIRequestContext) {
        return new UseAPI(requestContext);
    }

    /**
     * Use this Ability as an Actor.
     *
     * @param actor
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

    // eslint-disable-next-line class-methods-use-this
    public checkStatus(response: Response, status: number): Promise<boolean> {
        return Promise.resolve(response.status === status);
    }

    // eslint-disable-next-line class-methods-use-this
    public checkBody(response: Response, body: ResponseBodyFormat): Promise<boolean> {
        return Promise.resolve(response.body === body);
    }

    // eslint-disable-next-line class-methods-use-this
    public checkHeaders(response: Response, headers: Headers): Promise<boolean> {
        return Promise.resolve(response.headers === headers);
    }
}
