import { Action, Actor } from '@testla/screenplay';
import { SelectorOptions } from '../../types';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Action Class. Wait for either a specified loading state or for a selector to become visible/active.
 */
export class Wait extends Action {
    // the object that determines what to wait for (loading state, selector or selector == expected).
    // only 1 property is active at all times.
    private action: {
        mode: 'selector' | 'loadState';
        payload?: any;
    };

    private constructor(action: { mode: 'selector' | 'loadState', payload?: any }) {
        super();
        this.action = action;
    }

    /**
     * wait for either a specified loading state or for a selector to become visible/active.
     *
     * @param actor
     */
    public performAs(actor: Actor): Promise<any> {
        if (this.action.mode === 'loadState') {
            return BrowseTheWeb.as(actor).waitForLoadState(this.action.payload.state);
        }
        if (this.action.mode === 'selector') {
            return BrowseTheWeb.as(actor).waitForSelector(this.action.payload.selector, this.action.payload.options);
        }
        throw new Error('Error: no match for Wait.performAs()!');
    }

    /**
     * Wait for a specific status of the page.
     *
     * @param state either 'load', 'domcontentloaded' or 'networkidle'
     */
    public static forLoadState(state: 'load' | 'domcontentloaded' | 'networkidle'): Wait {
        return new Wait({ mode: 'loadState', payload: { state } });
    }

    /**
     * Wait for a specific selector to exist.
     *
     * @param selector the selector.
     * @param options (optional) advanced selector lookup options.
     */
    public static forSelector(selector: string, options?: SelectorOptions): Wait {
        return new Wait({ mode: 'selector', payload: { selector, options } });
    }
}
