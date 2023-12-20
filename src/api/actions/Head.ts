import { Actor } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { RequestMethod } from '../constants';
import { Headers, Response } from '../types';
import { ARequest } from './ARequest';

/**
 * Action Class. Send a HTTP HEAD Request.
 */
export class Head extends ARequest {
    private constructor(private url: string) {
        super();
    }

    /**
     * Send a HTTP HEAD request to the specified url.
     *
     * @param {Actor} actor the actor
     * @return {Response} the response
     */
    public async performAs(actor: Actor): Promise<Response> {
        return UseAPI.as(actor, this.abilityAlias).sendRequest(RequestMethod.GET, this.url, this.headers, 'none');
    }

    /**
     * Send a HTTP head request to the specified url.
     *
     * @param {string} url the URL of the target.
     * @return {Head} new instance
     */
    public static from(url: string): Head {
        return new Head(url);
    }

    /**
     * Add headers to the HTTP HEAD request to send.
     *
     * @param {Headers} headers the headers.
     * @return {Head} this instance
     */
    public withHeaders(headers: Headers): Head {
        this.headers = headers;
        return this;
    }
}
