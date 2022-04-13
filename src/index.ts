import {
    Actor, Action, Task, Question, Ability,
} from '@testla/screenplay';
import { BrowseTheWeb } from './screenplay/abilities/BrowseTheWeb';
import { Check } from './screenplay/actions/Check';
import { Click } from './screenplay/actions/Click';
import { DoubleClick } from './screenplay/actions/DoubleClick';
import { DragAndDrop } from './screenplay/actions/DragAndDrop';
import { Fill } from './screenplay/actions/Fill';
import { Hover } from './screenplay/actions/Hover';
import { Keyboard } from './screenplay/actions/Keyboard';
import { Navigate } from './screenplay/actions/Navigate';
import { Type } from './screenplay/actions/Type';
import { Wait } from './screenplay/actions/Wait';
import { Status } from './screenplay/questions/Status';

export {
    Actor, Action, Task, Question, Ability, BrowseTheWeb, Check, Wait, Hover, Navigate, Fill, Keyboard, DragAndDrop, Click, DoubleClick, Type, Status,
};
