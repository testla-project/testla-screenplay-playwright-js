import { Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../../types';
import { FrameEnabledAction } from '../../templates/FrameEnabledAction';
import { WaitForUrlOptions, ActionPageCommand } from '../types';
import { WaitPageCommandStrategy } from './strategies/WaitPageCommandStrategy';
import { WaitSelectorStrategy } from './strategies/WaitSelectorStrategy';

type Strategy = WaitPageCommandStrategy | WaitSelectorStrategy;

/**
 * Action Class. Wait for either a specified loading state or for a selector to become visible/active.
 */
export class Wait extends FrameEnabledAction {
    private strategy: Strategy;

    private constructor(strategy: Strategy) {
        super();
        this.strategy = strategy;
    }

    /**
     * wait for either a specified loading state or for a selector to become visible/active.
     *
     * @param {Actor} actor the actor object
     * @return {any} Returns when the required load state has been reached.
     */
    public async performAs(actor: Actor) {
        const { frameTree, abilityAlias } = this;
        return this.strategy.execute({ actor, abilityAlias, frameTree });
    }

    /**
     * Wait for a specific status of the page.
     *
     * @param {string} state either 'load', 'domcontentloaded' or 'networkidle'
     * @return {Wait} new Wait instance
     */
    public static forLoadState(state: 'load' | 'domcontentloaded' | 'networkidle'): Wait {
        // const instance = new Wait({ mode: 'loadState', payload: { state } });
        const command: ActionPageCommand = {
            method: 'waitForLoadState',
            args: [state],
        };
        const strategy = new WaitPageCommandStrategy(command);
        const instance = new Wait(strategy);
        instance.setCallStackInitializeCalledWith({ state });
        return instance;
    }

    /**
     * Wait for a specific selector to exist.
     *
     * @param {Selector} selector the selector.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Wait} new Wait instance
     */
    public static forSelector(selector: Selector, options?: SelectorOptions): Wait {
        const strategy = new WaitSelectorStrategy(selector, options);
        const instance = new Wait(strategy);
        instance.setCallStackInitializeCalledWith({ selector, options });
        return instance;
    }

    /**
     * Wait for a specific event.
     *
     * @param {string} event the event.
     * @return {Wait} new Wait instance
     */
    public static forEvent(event: string): Wait {
        const command: ActionPageCommand = {
            method: 'waitForEvent',
            args: [event],
        };
        const strategy = new WaitPageCommandStrategy(command);
        const instance = new Wait(strategy);
        instance.setCallStackInitializeCalledWith({ event });
        return instance;
    }

    /**
     * Wait for a specific url.
     *
     * @param {string} url the url to wait for.
     * @return {Wait} new Wait instance
     */
    public static forUrl(url: string | RegExp, options?: WaitForUrlOptions): Wait {
        const command: ActionPageCommand = {
            method: 'waitForURL',
            args: [url, options],
        };
        const strategy = new WaitPageCommandStrategy(command);
        const instance = new Wait(strategy);
        instance.setCallStackInitializeCalledWith({ url, options });
        return instance;
    }
}
