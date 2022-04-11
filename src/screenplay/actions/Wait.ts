import { Action, Actor } from '@testla/screenplay';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Activity Class. Wait for either a specified loading state or for a selector to become visible/active.
 */
export class Wait extends Action {
    // the object that determines what to wait for (loading state, selector or selector == expected).
    // only 1 property is active at all times.
    private params: {
        status?: string;
        selector?: string;
        expects?: {
            selector: string;
            expected: string;
            timeout?: number;
        };
    };

    private constructor(params: { status?: string, selector?: string, expects?: object }) {
        super();
        this.params = {};
        if (params.status !== undefined) {
            this.params.status = params.status;
        } else if (params.selector !== undefined) {
            this.params.selector = params.selector;
        } else if (params.expects !== undefined) {
            this.params.expects = { expected: '', selector: '', timeout: 0 };
            Object.assign(this.params.expects, params.expects);
        }
    }

    /**
     * wait for either a specified loading state or for a selector to become visible/active.
     *
     * @param actor
     */
    public performAs(actor: Actor): Promise<void> {
        if (this.params.status !== undefined) {
            return (BrowseTheWeb.as(actor) as BrowseTheWeb).waitForState(this.params.status);
        }
        if (this.params.selector !== undefined) {
            return (BrowseTheWeb.as(actor) as BrowseTheWeb).waitForSelectorAndClick(this.params.selector);
        }
        if (this.params.expects !== undefined) {
            return (BrowseTheWeb.as(actor) as BrowseTheWeb)
                .waitUntilEquals(this.params.expects.selector, this.params.expects.expected, this.params.expects.timeout);
        }
        throw new Error('Error: no match for Wait.performAs()!');
    }

    /**
     * Wait for a specific status of the page.
     *
     * @param status either 'load', 'domcontentloaded' or 'networkidle'
     */
    public static forStatus(status: string): Wait {
        return new Wait({ status, selector: undefined, expects: undefined });
    }

    /**
     * Wait for a specific selector to either appear/disappear from dom, or become visible/hidden; and click on it.
     *
     * @param selector the selector.
     */
    public static forSelectorAndClick(selector: string): Wait {
        return new Wait({ status: undefined, selector, expects: undefined });
    }

    /**
     * Wait for a specific selector to have the specified expected text string.
     *
     * @param selector the selector.
     * @param expected the text that the element should have.
     * @param timeout (optional) the maximum timeout to wait.
     */
    public static untilEquals(selector: string, expected: string, timeout?: number): Wait {
        return new Wait({ status: undefined, selector: undefined, expects: { selector, expected, timeout } });
    }
}
