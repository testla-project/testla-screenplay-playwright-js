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
import { Press } from './screenplay/actions/Press';
import { Navigate } from './screenplay/actions/Navigate';
import { Type } from './screenplay/actions/Type';
import { Wait } from './screenplay/actions/Wait';
import { Element } from './screenplay/questions/Element';

export {
    Actor, Action, Task, Question, Ability, BrowseTheWeb, Check, Wait, Hover, Navigate, Fill, Press, DragAndDrop, Click, DoubleClick, Type, Element,
};
