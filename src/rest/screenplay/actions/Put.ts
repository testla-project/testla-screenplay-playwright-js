import { Actor } from '@testla/screenplay';
import { UseRestAPI } from '../abilities/UseRestAPI';
import { Header, Response, REQUEST_METHOD } from '../../types';
import { AbstractRequest } from './AbstractRequest';

export class Put extends AbstractRequest {
    private constructor(private fullURL: string, private data?: any) {
        super();
    }

    public async performAs(actor: Actor): Promise<Response> {
        const response = await UseRestAPI.as(actor).sendPlaywrightRequest(REQUEST_METHOD.PUT, this.fullURL, this.headers, this.data);

        this.response.body = response.body;
        this.response.status = response.status;
        this.response.headers = response.headers;

        return this.response;
    }

    public static to(fullUrl: string): Put {
        return new Put(fullUrl);
    }

    public withData(data: any): Put {
        this.data = data;
        return this;
    }

    public withHeaders(headers: Header): Put {
        this.headers = headers;
        return this;
    }

    public andSaveResponseTo(response: Response): Put {
        this.response = response;
        return this;
    }
}
