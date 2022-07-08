import { Action } from '@testla/screenplay';

/**
 * Action Class. Pauses further test execution for a while. Does not require a particular Ability.
 */
export class Sleep extends Action {
    private constructor(private ms: number) {
        super();
    }

    /**
     * Performs the sleep.
     */
    public async performAs(): Promise<void> {
        // eslint-disable-next-line no-promise-executor-return
        return new Promise((resolve): any => setTimeout(resolve, this.ms));
    }

    /**
     * Add the specified cookies.
     *
     * @param cookies the cookies to add.
     */
    public static for(ms: number): Sleep {
        return new Sleep(ms);
    }
}
