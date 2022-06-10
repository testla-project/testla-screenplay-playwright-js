import { expect } from '@playwright/test';
import { Actor, Question } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { Headers, Response as ResponseType, ResponseBodyType } from '../types';

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class Response extends Question<boolean> {
    private static checkMode: 'is' | 'not';

    private action: {
        mode: 'status' | 'body' | 'header';
        payload?: any
    };

    private constructor(private response: ResponseType, action: { mode: 'status' | 'body' | 'header', payload: number | ResponseBodyType | Headers}) {
        super();
        this.action = action;
    }

    public async answeredBy(actor: Actor): Promise<boolean> {
        if (this.action.mode === 'status') {
            if (Response.checkMode === 'is') {
                // .is was called -> perform positive check
                expect(await UseAPI.as(actor).checkStatus(this.response, this.action.payload.status)).toBe(true);
                return true; // have to return something, if the question fails there will be an exception anyways
            }
            if (Response.checkMode === 'not') {
                // .not was called -> perform negative check
                expect(await UseAPI.as(actor).checkStatus(this.response, this.action.payload.status)).toBe(false);
                return true; // have to return something, if the question fails there will be an exception anyways
            }
        } if (this.action.mode === 'body') {
            if (Response.checkMode === 'is') {
                // .is was called -> perform positive check
                expect(await UseAPI.as(actor).checkBody(this.response, this.action.payload.body)).toBe(true);
                return true; // have to return something, if the question fails there will be an exception anyways
            }
            if (Response.checkMode === 'not') {
                // .not was called -> perform negative check
                expect(await UseAPI.as(actor).checkBody(this.response, this.action.payload.body)).toBe(false);
                return true; // have to return something, if the question fails there will be an exception anyways
            }
            // else branch: .not was not called -> perform regular check
        } if (this.action.mode === 'header') {
            if (Response.checkMode === 'is') {
                // .is was called -> perform positive check
                expect(await UseAPI.as(actor).checkHeaders(this.response, this.action.payload.headers)).toBe(true);
                return true; // have to return something, if the question fails there will be an exception anyways
            }
            if (Response.checkMode === 'not') {
                // .not was called -> perform negative check
                expect(await UseAPI.as(actor).checkHeaders(this.response, this.action.payload.headers)).toBe(false);
                return true; // have to return something, if the question fails there will be an exception anyways
            }
        }
        throw new Error('Unknown mode');
    }

    /**
     * make the Question check for the positive.
     */
    static get is() {
        Response.checkMode = 'is';
        return Element;
    }

    /**
     * make the Question check for the negative.
     */
    static get not() {
        Response.checkMode = 'not';
        return Response;
    }

    /**
     * Verify if the given status is equal to the given response's status.
     *
     * @param response the response to check.
     * @param statusCode the expected status code.
     */
    static hasStatusCode(response: ResponseType, statusCode: number): Response {
        return new Response(response, { mode: 'status', payload: { status: statusCode } });
    }

    /**
     * Verify if the given body is equal to the given response's body.
     *
     * @param response the response to check.
     * @param body the expected body.
     */
    static hasBody(response: ResponseType, body: ResponseBodyType): Response {
        return new Response(response, { mode: 'body', payload: { body } });
    }

    /**
     * Verify if the given headers are included in the given response.
     *
     * @param response the response to check.
     * @param headers the expected header.
     */
    static hasHeaders(response: ResponseType, headers: Headers): Response {
        return new Response(response, { mode: 'header', payload: { headers } });
    }
}
