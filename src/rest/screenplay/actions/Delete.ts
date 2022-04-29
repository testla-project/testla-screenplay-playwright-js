import { Actor } from '@testla/screenplay';
import { UseRestAPI } from '../abilities/UseRestAPI';
import { Header, Response, REQUEST_METHOD } from '../../types';
import { AbstractRequest } from './AbstractRequest';

export class Delete extends AbstractRequest {
    private constructor(private fullURL: string, private data?: any) {
        super();
    }

    public async performAs(actor: Actor): Promise<Response> {
        const response = await UseRestAPI.as(actor).sendPlaywrightRequest(REQUEST_METHOD.DELETE, this.fullURL, this.headers, this.data);

        this.response.body = response.body;
        this.response.status = response.status;
        this.response.headers = response.headers;

        return this.response;
    }

    public static from(fullUrl: string): Delete {
        return new Delete(fullUrl);
    }

    public withData(data: any): Delete {
        this.data = data;
        return this;
    }

    public withHeaders(headers: Header): Delete {
        this.headers = headers;
        return this;
    }

    public andSaveResponseTo(response: Response): Delete {
        this.response = response;
        return this;
    }
}
