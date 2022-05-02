import {
    Actor, Action, Task, Question, Ability,
} from '@testla/screenplay';

import { BrowseTheWeb } from './web/screenplay/abilities/BrowseTheWeb';
import { Check } from './web/screenplay/actions/Check';
import { Click } from './web/screenplay/actions/Click';
import { DoubleClick } from './web/screenplay/actions/DoubleClick';
import { DragAndDrop } from './web/screenplay/actions/DragAndDrop';
import { Fill } from './web/screenplay/actions/Fill';
import { Hover } from './web/screenplay/actions/Hover';
import { Press } from './web/screenplay/actions/Press';
import { Navigate } from './web/screenplay/actions/Navigate';
import { Type } from './web/screenplay/actions/Type';
import { Wait } from './web/screenplay/actions/Wait';
import { Element } from './web/screenplay/questions/Element';

import { UseRestAPI } from './rest/screenplay/abilities/UseRestAPI';
import { Delete } from './rest/screenplay/actions/Delete';
import { Get } from './rest/screenplay/actions/Get';
import { Head } from './rest/screenplay/actions/Head';
import { Patch } from './rest/screenplay/actions/Patch';
import { Post } from './rest/screenplay/actions/Post';
import { Put } from './rest/screenplay/actions/Put';

export {
    Actor, Action, Task, Question, Ability, BrowseTheWeb, Check, Wait, Hover, Navigate, Fill, Press, DragAndDrop, Click, DoubleClick, Type, Element,
    UseRestAPI, Delete, Get, Head, Patch, Post, Put,
};
