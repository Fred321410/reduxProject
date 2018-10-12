import { Action } from '@ngrx/store';

export enum CollectionActionTypes {
  Load = '[Collection] Load Prelevement Types',
  LoadSuccess = '[Collection] Load Prelevement Types Success',
  LoadFail = '[Collection] Load Prelevement Types Fail'
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = CollectionActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = CollectionActionTypes.LoadSuccess;

  constructor(public payload: string[]) {}
}

export class LoadFail implements Action {
  readonly type = CollectionActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type CollectionActions =
  | Load
  | LoadSuccess
  | LoadFail;
