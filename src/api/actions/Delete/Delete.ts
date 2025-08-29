import { Actor } from '@testla/screenplay';
import { UseAPI } from '../../abilities/UseAPI';
import { RequestMethod } from '../../constants';
import { Headers, Response, ResponseBodyFormat } from '../../types';
import { ARequest } from '../ARequest';

/**
 * Action Class. Send a HTTP DELETE Request.
 */
export class Delete extends ARequest {
    private responseBodyFormat: ResponseBodyFormat = 'json';

    private constructor(private url: string) {
        super();
    }

    /**
     * Send a HTTP DELETE request to the specified url.
     *
     * @param {Actor} actor the used actor
     * @return {Response} the response
     */
    public async performAs(actor: Actor): Promise<Response> {
        return UseAPI.as(actor, this.abilityAlias).sendRequest(RequestMethod.DELETE, this.url, this.headers, this.responseBodyFormat);
    }

    /**
     * Send a HTTP DELETE request to the specified url.
     *
     * @param {string} url the URL of the target.
     * @return {Delete} new instance
     */
    public static from(url: string): Delete {
        const instance = new Delete(url);
        instance.setCallStackInitializeCalledWith({ url });
        return instance;
    }

    /**
     * Add headers to the HTTP DELETE request to send.
     *
     * @param {Headers} headers the headers.
     * @return {Delete} the existing instance
     */
    public withHeaders(headers: Headers): Delete {
        this.headers = headers;
        this.addToCallStack({ caller: 'withHeaders', calledWith: { headers } });
        return this;
    }

    /**
     * Set the format the response body should be returned as.
     *
     * @param {ResponseBodyFormat} responseBodyFormat the format of the response body.
     * @return {Delete} the existing instance
     */
    public withResponseBodyFormat(responseBodyFormat: ResponseBodyFormat): Delete {
        this.responseBodyFormat = responseBodyFormat;
        this.addToCallStack({ caller: 'withResponseBodyFormat', calledWith: { responseBodyFormat } });
        return this;
    }
}
