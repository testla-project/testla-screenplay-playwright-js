import { Actor } from '@testla/screenplay';
import { UseAPI } from '../../abilities/UseAPI';
import { RequestMethod } from '../../constants';
import { Headers, Response, ResponseBodyFormat } from '../../types';
import { ARequest } from '../ARequest';

/**
 * Action Class. Send a HTTP GET Request.
 */
export class Get extends ARequest {
    private responseBodyFormat: ResponseBodyFormat = 'json';

    private constructor(private url: string) {
        super();
    }

    /**
     * Send a HTTP GET request to the specified url.
     *
     * @param {Actor} actor the actor object
     * @return {Response} the response
     */
    public async performAs(actor: Actor): Promise<Response> {
        return UseAPI.as(actor, this.abilityAlias).sendRequest(RequestMethod.GET, this.url, this.headers, this.responseBodyFormat);
    }

    /**
     * Send a HTTP GET request to the specified url.
     *
     * @param {string} url the URL of the target.
     * @return {Get} create a new instance
     */
    public static from(url: string): Get {
        const instance = new Get(url);
        instance.setCallStackInitializeCalledWith({ url });
        return instance;
    }

    /**
     * Add headers to the HTTP GET request to send.
     *
     * @param {Headers} headers the headers.
     * @return {Get} the instance
     */
    public withHeaders(headers: Headers): Get {
        this.headers = headers;
        this.addToCallStack({ caller: 'withHeaders', calledWith: { headers } });
        return this;
    }

    /**
     * Set the format the response body should be returned as.
     *
     * @param {ResponseBodyFormat} responseBodyFormat the format of the response body.
     * @return {Get} the instance
     */
    public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Get {
        this.responseBodyFormat = responseBodyFormat;
        this.addToCallStack({ caller: 'withResponseBodyFormat', calledWith: { responseBodyFormat } });
        return this;
    }
}
