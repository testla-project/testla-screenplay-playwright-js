import { Actor } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { REQUEST_METHOD } from '../constants';
import { Headers, Response, ResponseBodyFormat } from '../types';
import { ARequest } from './ARequest';

/**
 * Action Class. Send a HTTP PUT Request.
 */
export class Put extends ARequest {
    private data?: any;

    private responseBodyFormat: ResponseBodyFormat = 'json';

    private constructor(private url: string) {
        super();
    }

    /**
     * Send a HTTP PUT request to the specified url.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<Response> {
        return UseAPI.as(actor).sendRequest(REQUEST_METHOD.PUT, this.url, this.headers, this.responseBodyFormat, this.data);
    }

    /**
     * Send a HTTP PUT request to the specified url.
     *
     * @param url the URL of the target.
     */
    public static to(url: string): Put {
        return new Put(url);
    }

    /**
     * Add data to the HTTP PUT request to send.
     * PUT requests bodies hold the full entity information to be updated.
     *
     * @param data the data.
     */
    public withData(data: any): Put {
        this.data = data;
        return this;
    }

    /**
     * Add headers to the HTTP PUT request to send.
     *
     * @param headers the headers.
     */
    public withHeaders(headers: Headers): Put {
        this.headers = headers;
        return this;
    }

    /**
     * Set the format the response body should be returned as.
     *
     * @param responseBodyFormat the format of the response body.
     */
    public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Put {
        this.responseBodyFormat = responseBodyFormat;
        return this;
    }
}
