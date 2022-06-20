import { expect } from '@playwright/test';
import { Actor, Question } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { Headers, Response as ResponseType, ResponseBodyType } from '../types';

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class Response extends Question<boolean> {
    // the response to check.
    private response: ResponseType = { body: null, status: 0, headers: {} };

    // the expected values to check + which values to check.
    private action: { mode: 'status' | 'body' | 'header'; payload?: any } = { mode: 'status' };

    private constructor(private checkMode: 'is' | 'not') {
        super();
    }

    public async answeredBy(actor: Actor): Promise<boolean> {
        if (this.action.mode === 'status') {
            // if .is was called -> positive check, if .not was called -> negative check
            expect(await UseAPI.as(actor).checkStatus(this.response, this.action.payload.status)).toBe(this.checkMode === 'is');
            return true; // if the question fails there will be an exception
        }
        if (this.action.mode === 'body') {
            // if .is was called -> positive check, if .not was called -> negative check
            expect(await UseAPI.as(actor).checkBody(this.response, this.action.payload.body)).toBe(this.checkMode === 'is');
            return true; // if the question fails there will be an exception
        }
        if (this.action.mode === 'header') {
            // if .is was called -> positive check, if .not was called -> negative check
            expect(await UseAPI.as(actor).checkHeaders(this.response, this.action.payload.headers)).toBe(this.checkMode === 'is');
            return true; // if the question fails there will be an exception
        }
        throw new Error('Unknown mode for Response.answeredBy');
    }

    /**
     * make the Question check for the positive.
     */
    static get has() {
        return new Response('is');
    }

    /**
     * make the Question check for the negative.
     */
    static get not() {
        return new Response('not');
    }

    /**
     * Verify if the given status is equal to the given response's status.
     *
     * @param response the response to check.
     * @param statusCode the expected status code.
     */
    public statusCode(response: ResponseType, statusCode: number): Response {
        this.response = response;
        this.action = { mode: 'status', payload: { statusCode } };

        return this;
    }

    /**
     * Verify if the given body is equal to the given response's body.
     *
     * @param response the response to check.
     * @param body the expected body.
     */
    public body(response: ResponseType, body: ResponseBodyType): Response {
        this.response = response;
        this.action = { mode: 'body', payload: { body } };

        return this;
    }

    /**
     * Verify if the given headers are included in the given response.
     *
     * @param response the response to check.
     * @param headers the expected header.
     */
    public headers(response: ResponseType, headers: Headers): Response {
        this.response = response;
        this.action = { mode: 'header', payload: { headers } };

        return this;
    }
}
