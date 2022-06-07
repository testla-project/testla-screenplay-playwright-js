import { expect } from '@playwright/test';
import { Actor, Question } from '@testla/screenplay';
import { UseAPI } from '../abilities/UseAPI';
import { ARequest } from '../actions/ARequest';

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class ResponseTime extends Question<boolean> {
    // if true -> Response.not was called, answeredBy has to check for opposite
    private static expectNot = false;

    private constructor(private request: ARequest, private time: number) {
        super();
        this.request = request;
        this.time = time;
    }

    public async answeredBy(actor: Actor): Promise<boolean> {
        if (ResponseTime.expectNot) {
            // .not was called -> perform opposite check
            ResponseTime.expectNot = false;
            expect(await UseAPI.as(actor).checkResponseTime(this.request, this.time, actor)).toBe(false);
            return true; // have to return something, if the question fails there will be an exception anyways
        }
        // else branch: .not was not called -> perform regular check
        expect(await UseAPI.as(actor).checkResponseTime(this.request, this.time, actor)).toBe(true);
        return true; // have to return something, if the question fails there will be an exception anyways
    }

    /**
     * make the Question check for the opposite.
     */
    static get not() {
        ResponseTime.expectNot = true;
        return ResponseTime;
    }

    /**
     * Check if the response time for the given request is equal or under the expected time.
     *
     * @param request the request to check the response time for.
     * @param time the time that the response should be under.
     */
    static isEqualorUnder(request: ARequest, time: number): ResponseTime {
        return new ResponseTime(request, time);
    }
}
