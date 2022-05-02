import { Ability, Actor } from '@testla/screenplay';
import { APIRequestContext, APIResponse } from 'playwright';
import { RequestMethod, Response, REQUEST_METHOD } from '../../types';

export class UseRestAPI extends Ability {
    private constructor(private requestContext: APIRequestContext) {
        super();
    }

    /**
     * Initialize this Ability by passing an already existing Playwright APIRequestContext object.
     *
     * @param requestContext the Playwright APIRequestContext that will be used to send REST requests.
     */
    public static using(requestContext: APIRequestContext) {
        return new UseRestAPI(requestContext);
    }

    /**
     * Use this Ability as an Actor.
     *
     * @param actor
     */
    public static as(actor: Actor): UseRestAPI {
        return actor.withAbilityTo(this) as UseRestAPI;
    }

    /**
     * Send a HTTP request (GET, POST, PATCH, PUT, HEAD or DELETE) to the specified url. Headers and data can also be sent.
     *
     * @param method GET, POST, PATCH, PUT, HEAD or DELETE.
     * @param urlFull the full URL to the target.
     * @param headers (optional) the headers object.
     * @param data (optional) the data to be sent.
     * @returns a Response object consisting of status, body and headers.
     */
    public async sendRequest(method: RequestMethod, urlFull: string, headers?: any, data?: any): Promise<Response> {
        const options = {
            headers,
            ...(data !== undefined) && { data }, // add data to options object if there is data to send
        };

        let res: APIResponse;
        switch (method) {
            case REQUEST_METHOD.GET:
                console.log(`sending GET request to: ${urlFull}`);
                res = await this.requestContext.get(urlFull, options);
                break;
            case REQUEST_METHOD.POST:
                console.log(`sending POST request to: ${urlFull}`);
                res = await this.requestContext.post(urlFull, options);
                break;
            case REQUEST_METHOD.PATCH:
                console.log(`sending PATCH request to: ${urlFull}`);
                res = await this.requestContext.patch(urlFull, options);
                break;
            case REQUEST_METHOD.PUT:
                console.log(`sending PUT request to: ${urlFull}`);
                res = await this.requestContext.put(urlFull, options);
                break;
            case REQUEST_METHOD.HEAD:
                console.log(`sending HEAD request to: ${urlFull}`);
                res = await this.requestContext.head(urlFull, options);
                break;
            case REQUEST_METHOD.DELETE:
                console.log(`sending DELETE request to: ${urlFull}`);
                res = await this.requestContext.delete(urlFull, options);
                break;

            default:
                throw new Error('Error: HTTP method not supported.');
        }
        try {
            // try to return the JSON response.
            const resJSON = await res.json();
            const resHeaders = res.headers();

            return Promise.resolve({
                status: res.status(),
                body: resJSON,
                headers: resHeaders,
            });
        } catch (e) {
            // if the response is not in JSON format, return the plain text response.
            const resBody = await res.text();
            const resHeaders = res.headers();

            return Promise.resolve({
                status: res.status(),
                body: resBody,
                headers: resHeaders,
            });
        }
    }
}
