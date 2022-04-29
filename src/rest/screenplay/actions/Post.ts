import { Actor } from '@testla/screenplay';
import { UseRestAPI } from '../abilities/UseRestAPI';
import { Header, Response, REQUEST_METHOD } from '../../types';
import { AbstractRequest } from './AbstractRequest';

export class Post extends AbstractRequest {
    private constructor(private fullURL: string, private data?: any) {
        super();
    }

    public async performAs(actor: Actor): Promise<Response> {
        const response = await UseRestAPI.as(actor).sendPlaywrightRequest(REQUEST_METHOD.POST, this.fullURL, this.headers, this.data);

        this.response.body = response.body;
        this.response.status = response.status;
        this.response.headers = response.headers;

        return this.response;
    }

    public static to(fullUrl: string): Post {
        return new Post(fullUrl);
    }

    public withData(data: any): Post {
        this.data = data;
        return this;
    }

    public withHeaders(headers: Header): Post {
        this.headers = headers;
        return this;
    }

    public andSaveResponseTo(response: Response): Post {
        this.response = response;
        return this;
    }
}
