import { Actor } from '@testla/screenplay';
import { Maskable, Selector, SelectorOptions } from '../../types';
import { FrameEnabledAction } from '../../templates/FrameEnabledAction';
import { MASKING_STRING } from '../../../constants';
import { PressKeyStrategy } from './strategies/PressKeyStrategy';
import { PressSequentiallyStrategy } from './strategies/PressSequentiallyStrategy';

type Strategy = PressKeyStrategy | PressSequentiallyStrategy;

/**
 * Action Class. Press the specified key on the keyboard.
 */
export class Press extends FrameEnabledAction {
    private strategy: Strategy;

    private constructor(strategy: Strategy) {
        super();
        this.strategy = strategy;
    }

    /**
     * Press the specified key.
     *
     * @param {Actor} actor Actor performing this action
     * @return {void} Returns when the `key` can specify the intended value or a single character to generate the text for.
     */
    public async performAs(actor: Actor) {
        const { frameTree, abilityAlias } = this;
        return this.strategy.execute({ actor, abilityAlias, frameTree });
    }

    /**
     * Press a key on the keyboard. (or multiple keys with +, e.g. Shift+A)
     *
     * @param {string} keys the key(s) to press.
     * @return {Press} new Press instance
     */
    public static key(keys: string): Press {
        const strategy = new PressKeyStrategy(keys);
        const instance = new Press(strategy);
        instance.setCallStackInitializeCalledWith({ keys });
        return instance;
    }

    /**
     * Types the given input into the element specified by the selector.
     * @param {Selector} selector The selector of the source element.
     * @param {string} input The input to type into the element.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Press} new Press instance
     */
    public static sequentially(selector: Selector, input: string, options?: SelectorOptions & Maskable): Press {
        const strategy = new PressSequentiallyStrategy(selector, input, options);
        const instance = new Press(strategy);
        const inputToLog = options?.maskInLogs ? MASKING_STRING : input;
        instance.setCallStackInitializeCalledWith({ selector, input: inputToLog, options });
        return instance;
    }
}
