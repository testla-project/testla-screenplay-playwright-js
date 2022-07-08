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
     * Pause the execution of further test steps for a given interval in milliseconds.
     *
     * @param ms interval in milliseconds.
     */
    public static for(ms: number): Sleep {
        return new Sleep(ms);
    }
}
