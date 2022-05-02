import { Actor } from '@testla/screenplay';
import { UseRestAPI } from '../abilities/UseRestAPI';
import { Header, Response, REQUEST_METHOD } from '../../types';
import { AbstractRequest } from './AbstractRequest';

/**
 * Action Class. Send a HTTP PATCH Request.
 */
export class Patch extends AbstractRequest {
    private constructor(private fullURL: string, private data?: any) {
        super();
    }

    /**
     * Send a HTTP PATCH request to the specified url.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<Response> {
        const response = await UseRestAPI.as(actor).sendRequest(REQUEST_METHOD.PATCH, this.fullURL, this.headers, this.data);

        this.response.body = response.body;
        this.response.status = response.status;
        this.response.headers = response.headers;

        return this.response;
    }

    /**
     * Send a HTTP PATCH request to the specified url.
     *
     * @param fullUrl the URL of the target.
     */
    public static to(fullUrl: string): Patch {
        return new Patch(fullUrl);
    }

    /**
     * Add data to the HTTP PATCH request to send.
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
    public withHeaders(headers: Header): Patch {
        this.headers = headers;
        return this;
    }

    /**
     * Save the response to this HTTP request. After the request is executed, the response to the request will be written into the function argument.
     *
     * @param response the response to the request will be written into this function argument
     */
    public andSaveResponseTo(response: Response): Patch {
        this.response = response;
        return this;
    }
}
