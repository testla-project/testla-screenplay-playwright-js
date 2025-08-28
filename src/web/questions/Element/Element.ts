import { Actor } from '@testla/screenplay';
import { Selector, SelectorOptions } from '../../types';
import { CheckMode } from '../../../types';
import { FrameEnabledQuestion } from '../../templates/FrameEnabledQuestion';
import { CheckVisibilityStrategy } from './strategies/CheckVisibilityStrategy';
import { CheckEnabledStrategy } from './strategies/CheckEnabledStrategy';
import { CheckTextStrategy } from './strategies/CheckTextStrategy';
import { CheckValueStrategy } from './strategies/CheckValueStrategy';
import { CheckCheckedStrategy } from './strategies/CheckCheckedStrategy';
import { CheckCountStrategy } from './strategies/CheckCountStrategy';
import { CheckMinCountStrategy } from './strategies/CheckMinCountStrategy';

type Strategy = CheckVisibilityStrategy | CheckEnabledStrategy | CheckTextStrategy | CheckValueStrategy | CheckCheckedStrategy | CheckCountStrategy | CheckMinCountStrategy;

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class Element extends FrameEnabledQuestion {
    private strategy?: Strategy;

    private checkMode: CheckMode;

    private constructor(checkMode: CheckMode) {
        super();
        this.checkMode = checkMode;
    }

    /**
     * Verifies if an element.
     *
     * @param {Actor} actor the actor
     * @return {boolean} if .is was called -> positive check, if .not was called -> negative check
     */
    public async answeredBy(actor: Actor) {
        if (!this.strategy) {
            throw new Error('No strategy defined to resolve Element question');
        }
        const {
            checkMode, frameTree, abilityAlias,
        } = this;
        await this.strategy.execute({ actor, abilityAlias, frameTree, checkMode });
        return Promise.resolve(true); // if the ability method is not the expected result there will be an exception
    }

    /**
     * make the Question check for the positive.
     * @return {Element} new Element instance
     */
    static get toBe() {
        return new Element('positive');
    }

    /**
     * make the Question check for the negative.
     * @return {Element} new Element instance
     */
    static get notToBe() {
        return new Element('negative');
    }

    /**
     * make the Question check for the positive.
     * @return {Element} new Element instance
     */
    static get toHave() {
        return new Element('positive');
    }

    /**
     * make the Question check for the negative.
     * @return {Element} new Element instance
     */
    static get notToHave() {
        return new Element('negative');
    }

    /**
     * Verifies if an element is visible.
     *
     * @param {Selector} selector the selector
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Element} this Element instance
     */
    public visible(selector: Selector, options?: SelectorOptions): Element {
        this.strategy = new CheckVisibilityStrategy(selector, options);
        this.addToCallStack({ caller: 'visible', calledWith: { selector, options } });
        return this;
    }

    /**
     * Verifies if an element is enabled.
     *
     * @param {Selector} selector the selector
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Element} this Element instance
     */
    public enabled(selector: Selector, options?: SelectorOptions): Element {
        this.strategy = new CheckEnabledStrategy(selector, options);
        this.addToCallStack({ caller: 'enabled', calledWith: { selector, options } });
        return this;
    }

    /**
     * Verifies if an element has the given text.
     *
     * @param selector the selector.
     * @param text the text to check.
     * @param options (optional) advanced selector lookup options.
     */
    public text(selector: Selector, text: string | RegExp | (string | RegExp)[], options?: SelectorOptions): Element {
        this.strategy = new CheckTextStrategy(selector, text, options);
        this.addToCallStack({ caller: 'text', calledWith: { selector, text, options } });
        return this;
    }

    /**
     * Verifies if an element has the given value.
     *
     * @param selector the selector.
     * @param value the value to check.
     * @param options (optional) advanced selector lookup options.
     */
    public value(selector: Selector, value: string | RegExp, options?: SelectorOptions): Element {
        this.strategy = new CheckValueStrategy(selector, value, options);
        this.addToCallStack({ caller: 'value', calledWith: { selector, value, options } });
        return this;
    }

    /**
     * Verifies if an element has a minimum count.
     *
     * @param {Selector} selector the selector
     * @param {number} minimumCount the minimum count.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Element} this Element instance
     */
    public minCount(selector: Selector, minimumCount: number, options?: SelectorOptions): Element {
        this.strategy = new CheckMinCountStrategy(selector, minimumCount, options);
        this.addToCallStack({ caller: 'minCount', calledWith: { selector, minimumCount, options } });
        return this;
    }

    /**
     * Verifies if an element has a desired count.
     *
     * @param {Selector} selector the selector
     * @param {number} desiredCount the desired count.
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Element} this Element instance
     */
    public count(selector: Selector, desiredCount: number, options?: SelectorOptions): Element {
        this.strategy = new CheckCountStrategy(selector, desiredCount, options);
        this.addToCallStack({ caller: 'count', calledWith: { selector, desiredCount, options } });
        return this;
    }

    /**
     * Verifies if an element is checked.
     *
     * @param {Selector} selector the selector
     * @param {SelectorOptions} options (optional) advanced selector lookup options.
     * @return {Element} this Element instance
     */
    public checked(selector: Selector, options?: SelectorOptions): Element {
        this.strategy = new CheckCheckedStrategy(selector, options);
        this.addToCallStack({ caller: 'checked', calledWith: { selector, options } });
        return this;
    }
}
