import { Actor, Question } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { Headers, Response as ResponseType, ResponseBodyType } from '../types';
import { CheckMode } from '../../types';

/**
 * Question Class. Verify certain aspects of an API Response.
 */
export class Response extends Question<boolean> {
    // the response to check.
    private response: ResponseType = {
        body: null,
        status: 0,
        headers: {},
        duration: 0,
    };

    // the expected values to check + which values to check.
    private action!: {
        mode: 'status' | 'body' | 'header' | 'duration';
        payload?: any;
    };

    private constructor(private checkMode: CheckMode) {
        super();
    }

    /**
     * Verify if the given status is equal to the given response's status.
     *
     * @param {Actor} actor the actor which is used
     * @return {boolean} the verification result true or false
     */
    public async answeredBy(actor: Actor): Promise<boolean> {
        if (this.action.mode === 'status') {
            // if .is was called -> positive check, if .not was called -> negative check
            return Promise.resolve(
                await UseAPI.as(actor, this.abilityAlias).checkStatus(this.response, this.action.payload.statusCode, this.checkMode === 'positive' ? 'equal' : 'unequal'),
            ); // if the ability method is not the expected result there will be an exception
        }
        if (this.action.mode === 'body') {
            // if .is was called -> positive check, if .not was called -> negative check
            return Promise.resolve(
                await UseAPI.as(actor, this.abilityAlias).checkBody(this.response, this.action.payload.body, this.checkMode === 'positive' ? 'equal' : 'unequal'),
            ); // if the ability method is not the expected result there will be an exception
        }
        if (this.action.mode === 'header') {
            // if .is was called -> positive check, if .not was called -> negative check
            return Promise.resolve(
                await UseAPI.as(actor, this.abilityAlias).checkHeaders(this.response, this.action.payload.headers, this.checkMode === 'positive' ? 'included' : 'excluded'),
            ); // if the ability method is not the expected result there will be an exception
        }
        if (this.action.mode === 'duration') {
            // if .is was called -> positive check, if .not was called -> negative check
            return Promise.resolve(
                await UseAPI.as(actor, this.abilityAlias).checkDuration(this.response, this.action.payload.duration, this.checkMode === 'positive' ? 'lessOrEqual' : 'greater'),
            ); // if the ability method is not the expected result there will be an exception
        }
        throw new Error('Unknown mode for Response.answeredBy');
    }

    /**
     * make the Question check for the positive.
     * @return {Response} the new Response instance
     */
    static get has(): Response {
        return new Response('positive');
    }

    /**
     * make the Question check for the negative.
     * @return {Response} the new Response instance
     */
    static get hasNot(): Response {
        return new Response('negative');
    }

    /**
     * Verify if the given status is equal to the given response's status.
     *
     * @param {ResponseType} response the response to check.
     * @param {number} statusCode the expected status code.
     * @return {Response} the Response instance
     */
    public statusCode(response: ResponseType, statusCode: number): Response {
        this.response = response;
        this.addToCallStack({ caller: 'statusCode', calledWith: { response, statusCode } });
        this.action = { mode: 'status', payload: { statusCode } };

        return this;
    }

    /**
     * Verify if the given body is equal to the given response's body.
     *
     * @param {ResponseType} response the response to check.
     * @param {ResponseBodyType} body the expected body.
     * @return {Response} the Response instance
     */
    public body(response: ResponseType, body: ResponseBodyType): Response {
        this.response = response;
        this.addToCallStack({ caller: 'body', calledWith: { response, body } });
        this.action = { mode: 'body', payload: { body } };

        return this;
    }

    /**
     * Verify if the given headers are included in the given response.
     *
     * @param {ResponseType} response the response to check.
     * @param {Headers} headers the expected header.
     * @return {Response} the Response instance
     */
    public headers(response: ResponseType, headers: Headers): Response {
        this.response = response;
        this.addToCallStack({ caller: 'headers', calledWith: { response, headers } });
        this.action = { mode: 'header', payload: { headers } };

        return this;
    }

    /**
     * Verify if the reponse (including receiving body) was received within a given duration.
     *
     * @param {ResponseType} response the response to check
     * @param {number} duration expected duration (in milliseconds) not to be exceeded
     * @return {Response} the Response instance
     */
    public beenReceivedWithin(response: ResponseType, duration: number): Response {
        this.response = response;
        this.addToCallStack({ caller: 'beenReceivedWithin', calledWith: { response, duration } });
        this.action = { mode: 'duration', payload: { duration } };

        return this;
    }
}
