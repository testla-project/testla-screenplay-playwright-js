import { Actor, Question } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { Headers, Response as ResponseType, ResponseBodyType } from '../types';

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class Response extends Question<boolean> {
    private action: {
        mode: 'status' | 'body' | 'header';
        payload?: any
    };

    private constructor(private response: ResponseType, action: { mode: 'status' | 'body' | 'header', payload: number | ResponseBodyType | Headers}) {
        super();
        this.action = action;
    }

    public answeredBy(actor: Actor): Promise<boolean> {
        if (this.action.mode === 'status') {
            return UseAPI.as(actor).checkStatus(this.response, this.action.payload.status);
        } if (this.action.mode === 'body') {
            return UseAPI.as(actor).checkBody(this.response, this.action.payload.body);
        } if (this.action.mode === 'header') {
            return UseAPI.as(actor).checkHeaders(this.response, this.action.payload.headers);
        }
        throw new Error('Unknown mode');
    }

    /**
     * Verifies if the response has the expected status code.
     *
     * @param response the response to check.
     * @param statusCode the expected status code.
     */
    static hasStatusCode(response: ResponseType, statusCode: number): Response {
        return new Response(response, { mode: 'status', payload: { status: statusCode } });
    }

    /**
     * Verifies if the response has the expected body.
     *
     * @param response the response to check.
     * @param body the expected body.
     */
    static bodyEquals(response: ResponseType, body: ResponseBodyType): Response {
        return new Response(response, { mode: 'body', payload: { body } });
    }

    /**
     * Verifies if the response has the expected headers.
     *
     * @param response the response to check.
     * @param headers the expected header.
     */
    static hasHeaders(response: ResponseType, headers: Headers): Response {
        return new Response(response, { mode: 'header', payload: { headers } });
    }
}
