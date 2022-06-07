import { Actor } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { REQUEST_METHOD } from '../constants';
import { Headers, Response, ResponseBodyFormat } from '../types';
import { ARequest } from './ARequest';

/**
 * Action Class. Send a HTTP PATCH Request.
 */
export class Patch extends ARequest {
    private data?: any;

    private responseBodyFormat: ResponseBodyFormat = 'json';

    private constructor(private url: string) {
        super();
    }

    /**
     * Send a HTTP PATCH request to the specified url.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<Response> {
        return UseAPI.as(actor).sendRequest(REQUEST_METHOD.PATCH, this.url, this.headers, this.responseBodyFormat, this.data);
    }

    /**
     * Send a HTTP PATCH request to the specified url.
     *
     * @param url the URL of the target.
     */
    public static to(url: string): Patch {
        return new Patch(url);
    }

    /**
     * Add data to the HTTP PATCH request to send.
     * PATCH requests bodies hold partial updates of the entities to be updated.
     *
     * @param data the data.
     */
    public withData(data: any): Patch {
        this.data = data;
        return this;
    }

    /**
     * Add headers to the HTTP PATCH request to send.
     *
     * @param headers the headers.
     */
    public withHeaders(headers: Headers): Patch {
        this.headers = headers;
        return this;
    }

    /**
     * Set the format the response body should be returned as.
     *
     * @param responseBodyFormat the format of the response body.
     */
    public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Patch {
        this.responseBodyFormat = responseBodyFormat;
        return this;
    }
}
