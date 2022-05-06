import {
    Actor, Action, Task, Question, Ability,
} from '@testla/screenplay';

import { BrowseTheWeb } from './screenplay/web/abilities/BrowseTheWeb';
import { Check } from './screenplay/web/actions/Check';
import { Click } from './screenplay/web/actions/Click';
import { DoubleClick } from './screenplay/web/actions/DoubleClick';
import { DragAndDrop } from './screenplay/web/actions/DragAndDrop';
import { Fill } from './screenplay/web/actions/Fill';
import { Hover } from './screenplay/web/actions/Hover';
import { Press } from './screenplay/web/actions/Press';
import { Navigate } from './screenplay/web/actions/Navigate';
import { Type } from './screenplay/web/actions/Type';
import { Wait } from './screenplay/web/actions/Wait';
import { Element } from './screenplay/web/questions/Element';

import { UseAPI } from './screenplay/api/abilities/UseAPI';
import { Delete } from './screenplay/api/actions/Delete';
import { Get } from './screenplay/api/actions/Get';
import { Head } from './screenplay/api/actions/Head';
import { Patch } from './screenplay/api/actions/Patch';
import { Post } from './screenplay/api/actions/Post';
import { Put } from './screenplay/api/actions/Put';
import { Response } from './screenplay/api/questions/Response';

export {
    Actor, Action, Task, Question, Ability, BrowseTheWeb, Check, Wait, Hover, Navigate, Fill, Press, DragAndDrop, Click, DoubleClick, Type, Element,
    UseAPI, Delete, Get, Head, Patch, Post, Put, Response,
};
