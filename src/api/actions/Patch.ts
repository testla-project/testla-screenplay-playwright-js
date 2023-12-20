import { Actor } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { RequestMethod } from '../constants';
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
     * @param {Actor} actor the actor executes the request
     * @return {Response} the response
     */
    public async performAs(actor: Actor): Promise<Response> {
        return UseAPI.as(actor, this.abilityAlias).sendRequest(RequestMethod.PATCH, this.url, this.headers, this.responseBodyFormat, this.data);
    }

    /**
     * Send a HTTP PATCH request to the specified url.
     *
     * @param {string} url the URL of the target.
     * @return {Patch} the new instance
     */
    public static to(url: string): Patch {
        return new Patch(url);
    }

    /**
     * Add data to the HTTP PATCH request to send.
     * PATCH requests bodies hold partial updates of the entities to be updated.
     *
     * @param {any} data the data.
     * @return {Patch} this instance
     */
    public withData(data: any): Patch {
        this.data = data;
        return this;
    }

    /**
     * Add headers to the HTTP PATCH request to send.
     *
     * @param {Headers} headers the headers.
     * @return {Patch} this instance
     */
    public withHeaders(headers: Headers): Patch {
        this.headers = headers;
        return this;
    }

    /**
     * Set the format the response body should be returned as.
     *
     * @param {ResponseBodyFormat} responseBodyFormat the format of the response body.
     * @return {Patch} this instance
     */
    public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Patch {
        this.responseBodyFormat = responseBodyFormat;
        return this;
    }
}
