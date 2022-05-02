import { Actor } from '@testla/screenplay';
import { UseRestAPI } from '../abilities/UseRestAPI';
import { Header, Response, REQUEST_METHOD } from '../../types';
import { AbstractRequest } from './AbstractRequest';

/**
 * Action Class. Send a HTTP GET Request.
 */
export class Get extends AbstractRequest {
    private constructor(private fullURL: string) {
        super();
    }

    /**
     * Send a HTTP GET request to the specified url.
     *
     * @param actor
     */
    public async performAs(actor: Actor): Promise<Response> {
        const response = await UseRestAPI.as(actor).sendRequest(REQUEST_METHOD.GET, this.fullURL, this.headers);

        this.response.body = response.body;
        this.response.status = response.status;
        this.response.headers = response.headers;

        return this.response;
    }

    /**
     * Send a HTTP GET request to the specified url.
     *
     * @param fullUrl the URL of the target.
     */
    public static from(fullUrl: string): Get {
        return new Get(fullUrl);
    }

    /**
     * Add headers to the HTTP GET request to send.
     *
     * @param headers the headers.
     */
    public withHeaders(headers: Header): Get {
        this.headers = headers;
        return this;
    }

    /**
     * Save the response to this HTTP request. After the request is executed, the response to the request will be written into the function argument.
     *
     * @param response the response to the request will be written into this function argument
     */
    public andSaveResponseTo(response: Response): Get {
        this.response = response;
        return this;
    }
}
