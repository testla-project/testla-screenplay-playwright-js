import { Actor } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { REQUEST_METHOD } from '../constants';
import { Headers, Response, ResponseBodyFormat } from '../types';
import { ARequest } from './ARequest';

/**
 * Action Class. Send a HTTP GET Request.
 */
export class Get extends ARequest {
    private responseBodyFormat: ResponseBodyFormat = 'text';

    private constructor(private url: string) {
        super();
    }

    /**
     * Send a HTTP GET request to the specified url.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<Response> {
        return UseAPI.as(actor).sendRequest(REQUEST_METHOD.GET, this.url, this.headers, this.responseBodyFormat);
    }

    /**
     * Send a HTTP GET request to the specified url.
     *
     * @param url the URL of the target.
     */
    public static from(url: string): Get {
        return new Get(url);
    }

    /**
     * Add headers to the HTTP GET request to send.
     *
     * @param headers the headers.
     */
    public withHeaders(headers: Headers): Get {
        this.headers = headers;
        return this;
    }

    /**
     * Set the format the response body should be returned as.
     *
     * @param responseBodyFormat the format of the response body.
     */
    public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Get {
        this.responseBodyFormat = responseBodyFormat;
        return this;
    }
}
