import { Actor, Action } from '@testla/screenplay';
import { Response, Header } from '../../types';

/**
 * Abstract parent class for all HTTP request methods. This class extends the testla Action.
 */
export abstract class AbstractRequest extends Action {
    // the request response will be saved inside this object.
    protected response: Response = { body: '', headers: [], status: 0 };

    // HTTP headers to send with the request.
    protected headers: Header = {};

    abstract performAs(actor: Actor): Promise<any>;
}
