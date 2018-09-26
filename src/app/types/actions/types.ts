import { Action } from '@ngrx/store';
import { Type } from '../models/type';

export enum TypeActionTypes {
  Search = '[Type] Search',
  SearchComplete = '[Type] Search Complete',
  SearchError = '[Type] Search Error',
  Load = '[Type] Load',
  Select = '[Type] Select',
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
export type TypeActions = Search | SearchComplete | SearchError | Load | Select;
