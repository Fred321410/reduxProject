import { Action } from '@ngrx/store';
import { Type } from '../models/type';
import {Update} from '@ngrx/entity';

export enum TypeActionTypes {
  Search = '[Type] Search',
  SearchComplete = '[Type] Search Complete',
  SearchError = '[Type] Search Error',
  Load = '[Type] Load',
  Select = '[Type] Select',
  AddSousType = '[Type] Add SousType',
  AddSousTypeSuccess = '[Type] Add SousType Success',
  AddSousTypeFail = '[Type] Add SousType Fail',
  RemoveSousType = '[Type] Remove SousType',
  RemoveSousTypeSuccess = '[Type] Remove SousType Success',
  RemoveSousTypeFail = '[Type] Remove SousType Fail',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class Search implements Action {
  readonly type = TypeActionTypes.Search;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = TypeActionTypes.SearchComplete;

  constructor(public payload: Type[]) {}
}

export class SearchError implements Action {
  readonly type = TypeActionTypes.SearchError;

  constructor(public payload: string) {}
}

export class AddSousType implements Action {
  readonly type = TypeActionTypes.AddSousType;

  constructor(public payload: {
    sousType: string,
    type: Type
  }) {}
}

export class AddSousTypeSuccess implements Action {
  readonly type = TypeActionTypes.AddSousTypeSuccess;

  constructor(public payload: {type: Update<Type>}) {}
}

export class AddSousTypeFail implements Action {
  readonly type = TypeActionTypes.AddSousTypeFail;

  constructor(public payload: {
    type: Type,
    sousType: string
  }) {}
}

export class RemoveSousType implements Action {
  readonly type = TypeActionTypes.RemoveSousType;

  constructor(public payload: {
    sousType: string,
    type: Type
  }) {}
}

export class RemoveSousTypeSuccess implements Action {
  readonly type = TypeActionTypes.RemoveSousTypeSuccess;

  constructor(public payload: {type: Update<Type>}) {}
}

export class RemoveSousTypeFail implements Action {
  readonly type = TypeActionTypes.RemoveSousTypeFail;

  constructor(public payload: {
    type: Type,
    sousType: string
  }) {}
}

export class Load implements Action {
  readonly type = TypeActionTypes.Load;

  constructor(public payload: Type) {}
}

export class Select implements Action {
  readonly type = TypeActionTypes.Select;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TypeActions = Search
  | SearchComplete
  | SearchError
  | Load
  | Select
  | AddSousType
  | AddSousTypeSuccess
  | AddSousTypeFail
  | RemoveSousType
  | RemoveSousTypeSuccess
  | RemoveSousTypeFail;
