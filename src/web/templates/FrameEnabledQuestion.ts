import { Question } from '@testla/screenplay';
import { FrameSelector } from '../types';

export abstract class FrameEnabledQuestion extends Question<boolean> {
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
