import { Actor } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { REQUEST_METHOD } from '../constants';
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
     * @param actor
     */
    public async performAs(actor: Actor): Promise<Response> {
        return UseAPI.as(actor).sendRequest(REQUEST_METHOD.GET, this.url, this.headers, 'none');
    }

    /**
     * Send a HTTP head request to the specified url.
     *
     * @param url the URL of the target.
     */
    public static from(url: string): Head {
        return new Head(url);
    }

    /**
     * Add headers to the HTTP HEAD request to send.
     *
     * @param headers the headers.
     */
    public withHeaders(headers: Headers): Head {
        this.headers = headers;
        return this;
    }
}
