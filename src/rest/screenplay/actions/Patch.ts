import { Actor } from '@testla/screenplay';
import { UseRestAPI } from '../abilities/UseRestAPI';
import { Header, Response, REQUEST_METHOD } from '../../types';
import { AbstractRequest } from './AbstractRequest';

export class Patch extends AbstractRequest {
    private constructor(private fullURL: string, private data?: any) {
        super();
    }

    public async performAs(actor: Actor): Promise<Response> {
        const response = await UseRestAPI.as(actor).sendPlaywrightRequest(REQUEST_METHOD.PATCH, this.fullURL, this.headers, this.data);

        this.response.body = response.body;
        this.response.status = response.status;
        this.response.headers = response.headers;

        return this.response;
    }

    public static to(fullUrl: string): Patch {
        return new Patch(fullUrl);
    }

    public withData(data: any): Patch {
        this.data = data;
        return this;
    }

    public withHeaders(headers: Header): Patch {
        this.headers = headers;
        return this;
    }

    public andSaveResponseTo(response: Response): Patch {
        this.response = response;
        return this;
    }
}
