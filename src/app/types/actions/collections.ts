import { Action } from '@ngrx/store';
import { Type } from '../models/type';

export enum CollectionActionTypes {
  AddType = '[Collection] Add Type',
  AddTypeSuccess = '[Collection] Add Type Success',
  AddTypeFail = '[Collection] Add Type Fail',
  AddTypeCancel = '[Collection] Add Type Cancel',
  RemoveType = '[Collection] Remove Type',
  RemoveTypeSuccess = '[Collection] Remove Type Success',
  RemoveTypeFail = '[Collection] Remove Type Fail',
  Load = '[Collection] Load Types',
  LoadSuccess = '[Collection] Load Types Success',
  LoadFail = '[Collection] Load Types Fail',
  ExpendTypePanel = '[Collection] Expend Type Panel'
}

/**
 * Add Type to Collection Actions
 */
export class AddType implements Action {
  readonly type = CollectionActionTypes.AddType;

  constructor(public payload: Type) {}
}

export class AddTypeSuccess implements Action {
  readonly type = CollectionActionTypes.AddTypeSuccess;

  constructor(public payload: Type) {}
}

export class AddTypeFail implements Action {
  readonly type = CollectionActionTypes.AddTypeFail;

  constructor(public payload: Type) {}
}

export class AddTypeCancel implements Action {
  readonly type = CollectionActionTypes.AddTypeCancel;

  constructor() {}
}

/**
 * Remove Type from Collection Actions
 */
export class RemoveType implements Action {
  readonly type = CollectionActionTypes.RemoveType;

  constructor(public payload: Type) {}
}

export class RemoveTypeSuccess implements Action {
  readonly type = CollectionActionTypes.RemoveTypeSuccess;

  constructor(public payload: Type) {}
}

export class RemoveTypeFail implements Action {
  readonly type = CollectionActionTypes.RemoveTypeFail;

  constructor(public payload: Type) {}
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = CollectionActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = CollectionActionTypes.LoadSuccess;

  constructor(public payload: Type[]) {}
}

export class LoadFail implements Action {
  readonly type = CollectionActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export class ExpendTypePanel implements Action {
  readonly type = CollectionActionTypes.ExpendTypePanel;

  constructor(public payload: Type) {}
}

export type CollectionActions =
  | AddType
  | AddTypeSuccess
  | AddTypeFail
  | AddTypeCancel
  | RemoveType
  | RemoveTypeSuccess
  | RemoveTypeFail
  | Load
  | LoadSuccess
  | LoadFail
  | ExpendTypePanel;
