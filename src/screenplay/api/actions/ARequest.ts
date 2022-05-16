import { Actor, Action } from '@testla/screenplay';
import { Headers } from '../types';

/**
 * Abstract parent class for all HTTP request methods. This class extends the testla Action.
 */
export abstract class ARequest extends Action {
    // HTTP headers to send with the request.
    protected headers: Headers = {};

    abstract performAs(actor: Actor): Promise<any>;
}
