import { Action } from '@testla/screenplay';
import { FrameSelector } from '../types';

export abstract class FrameEnabledAction extends Action {
    // value which will be forwared to call the actual frame(s)
    public frameTree: FrameSelector[] = [];

    /**
     * Set the frameSelector which is used for the action.
     *
     * @param {FrameSelector} frameSelector frame selector.
     * @returns current action
     */
    public inFrame(frameSelector: FrameSelector) {
        this.frameTree.push(frameSelector);
        return this;
    }
}
