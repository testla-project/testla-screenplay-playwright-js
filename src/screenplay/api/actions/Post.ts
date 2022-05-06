import { Actor } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { REQUEST_METHOD } from '../constants';
import { Headers, Response, ResponseBodyFormat } from '../types';
import { ARequest } from './ARequest';

/**
 * Action Class. Send a HTTP POST Request.
 */
export class Post extends ARequest {
    private data?: any;

    private responseBodyFormat: ResponseBodyFormat = 'json';

    private constructor(private url: string) {
        super();
    }

    /**
     * Send a HTTP POST request to the specified url.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<Response> {
        return UseAPI.as(actor).sendRequest(REQUEST_METHOD.POST, this.url, this.headers, this.responseBodyFormat, this.data);
    }

    /**
     * Send a HTTP POST request to the specified url.
     *
     * @param url the URL of the target.
     */
    public static to(url: string): Post {
        return new Post(url);
    }

    /**
     * Add data to the HTTP POST request to send.
     *
     * @param data the data.
     */
    public withData(data: any): Post {
        this.data = data;
        return this;
    }

    /**
     * Add headers to the HTTP POST request to send.
     *
     * @param headers the headers.
     */
    public withHeaders(headers: Headers): Post {
        this.headers = headers;
        return this;
    }

    /**
     * Set the format the response body should be returned as.
     *
     * @param responseBodyFormat the format of the response body.
     */
    public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Post {
        this.responseBodyFormat = responseBodyFormat;
        return this;
    }
}
