import { Action } from '@ngrx/store';
import { Localisation } from '../models/localisation';

export enum LocalisationActionTypes {
  Search = '[Localisation] Search',
  SearchComplete = '[Localisation] Search Complete',
  SearchError = '[Localisation] Search Error',
  Load = '[Localisation] Load',
  Select = '[Localisation] Select',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class Search implements Action {
  readonly type = LocalisationActionTypes.Search;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = LocalisationActionTypes.SearchComplete;

  constructor(public payload: Localisation[]) {}
}

export class SearchError implements Action {
  readonly type = LocalisationActionTypes.SearchError;

  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = LocalisationActionTypes.Load;

  constructor(public payload: Localisation) {}
}

export class Select implements Action {
  readonly type = LocalisationActionTypes.Select;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type LocalisationActions = Search | SearchComplete | SearchError | Load | Select;
