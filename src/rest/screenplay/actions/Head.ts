import { Actor } from '@testla/screenplay';
import { UseRestAPI } from '../abilities/UseRestAPI';
import { Header, Response, REQUEST_METHOD } from '../../types';
import { AbstractRequest } from './AbstractRequest';

export class Head extends AbstractRequest {
    private constructor(private fullURL: string) {
        super();
    }

    public async performAs(actor: Actor): Promise<Response> {
        const response = await UseRestAPI.as(actor).sendPlaywrightRequest(REQUEST_METHOD.GET, this.fullURL, this.headers);

        this.response.body = response.body;
        this.response.status = response.status;
        this.response.headers = response.headers;

        return this.response;
    }

    public static from(fullUrl: string): Head {
        return new Head(fullUrl);
    }

    public withHeaders(headers: Header): Head {
        this.headers = headers;
        return this;
    }

    public andSaveResponseTo(saveLocation: Response): Head {
        this.response = saveLocation;
        return this;
    }
}
