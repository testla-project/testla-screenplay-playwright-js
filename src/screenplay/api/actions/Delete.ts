import { Actor } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { REQUEST_METHOD } from '../constants';
import { Headers, Response, ResponseBodyFormat } from '../types';
import { ARequest } from './ARequest';

/**
 * Action Class. Send a HTTP DELETE Request.
 */
export class Delete extends ARequest {
    private data?: any;

    private responseBodyFormat: ResponseBodyFormat = 'json';

    private constructor(private url: string) {
        super();
    }

    /**
     * Send a HTTP DELETE request to the specified url.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<Response> {
        return UseAPI.as(actor).sendRequest(REQUEST_METHOD.DELETE, this.url, this.headers, this.data);
    }

    /**
     * Send a HTTP DELETE request to the specified url.
     *
     * @param fullUrl the URL of the target.
     */
    public static from(fullUrl: string): Delete {
        return new Delete(fullUrl);
    }

    /**
     * Add data to the HTTP DELETE request to send.
     *
     * @param data the data.
     */
    public withData(data: any): Delete {
        this.data = data;
        return this;
    }

    /**
     * Add headers to the HTTP DELETE request to send.
     *
     * @param headers the headers.
     */
    public withHeaders(headers: Headers): Delete {
        this.headers = headers;
        return this;
    }

    /**
     * Set the format the response body should be returned as.
     *
     * @param responseBodyFormat the format of the response body.
     */
    public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Delete {
        this.responseBodyFormat = responseBodyFormat;
        return this;
    }
}
