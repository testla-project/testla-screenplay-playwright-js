import { Actor, Question } from '@testla/screenplay';
import { UseAPI } from '../../abilities/UseAPI';
import { Headers, Response as ResponseType, ResponseBodyType } from '../types';
import { CheckMode } from '../../../types';
import { QuestionResponseCheckCommand } from './types';

/**
 * Question Class. Verify certain aspects of an API Response.
 */
export class Response extends Question<boolean> {
    private checkMode: CheckMode;

    private command?: QuestionResponseCheckCommand;
    
    private constructor(checkMode: CheckMode) {
        super();
        this.checkMode = checkMode;
    }

    /**
     * Verify if the given status is equal to the given response's status.
     *
     * @param {Actor} actor the actor which is used
     * @return {boolean} the verification result true or false
     */
    public async answeredBy(actor: Actor): Promise<boolean> {
        if (!this.command) {
            throw new Error('No check to execute set');
        }
        // if .is was called -> positive check, if .not was called -> negative check
        return Promise.resolve(
            // eslint-disable-next-line
            // @ts-ignore
            await UseAPI.as(actor, this.abilityAlias)[this.command.method](...this.command.args),
            // this is not a problem since we ensure type safety when creating the command
        ); // if the ability method is not the expected result there will be an exception
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
        this.command = {
            method: 'checkStatus',
            args: [response, statusCode, this.checkMode === 'positive' ? 'equal' : 'unequal'],
        };
        this.addToCallStack({ caller: 'statusCode', calledWith: { response, statusCode } });
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
        this.command = {
            method: 'checkBody',
            args: [response, body, this.checkMode === 'positive' ? 'equal' : 'unequal'],
        };
        this.addToCallStack({ caller: 'body', calledWith: { response, body } });
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
        this.command = {
            method: 'checkHeaders',
            args: [response, headers, this.checkMode === 'positive' ? 'included' : 'excluded'],
        };
        this.addToCallStack({ caller: 'headers', calledWith: { response, headers } });
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
        this.command = {
            method: 'checkDuration',
            args: [response, duration, this.checkMode === 'positive' ? 'lessOrEqual' : 'greater'],
        };
        this.addToCallStack({ caller: 'beenReceivedWithin', calledWith: { response, duration } });
        return this;
    }
}
