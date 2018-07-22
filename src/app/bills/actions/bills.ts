import { Action } from '@ngrx/store';
import { Bill } from '../models/bill';

export enum BillActionTypes {
  Search = '[Bill] Search',
  SearchComplete = '[Bill] Search Complete',
  SearchError = '[Bill] Search Error',
  Load = '[Bill] Load',
  Select = '[Bill] Select',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class Search implements Action {
  readonly type = BillActionTypes.Search;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = BillActionTypes.SearchComplete;

  constructor(public payload: Bill[]) {}
}

export class SearchError implements Action {
  readonly type = BillActionTypes.SearchError;

  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = BillActionTypes.Load;

  constructor(public payload: Bill) {}
}

export class Select implements Action {
  readonly type = BillActionTypes.Select;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type BillActions = Search | SearchComplete | SearchError | Load | Select;
