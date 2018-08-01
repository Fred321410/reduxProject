import { Action } from '@ngrx/store';
import { Localisation } from '../models/localisation';

export enum CollectionActionTypes {
  AddLocalisation = '[Collection] Add Localisation',
  AddLocalisationSuccess = '[Collection] Add Localisation Success',
  AddLocalisationFail = '[Collection] Add Localisation Fail',
  RemoveLocalisation = '[Collection] Remove Localisation',
  RemoveLocalisationSuccess = '[Collection] Remove Localisation Success',
  RemoveLocalisationFail = '[Collection] Remove Localisation Fail',
  Load = '[Collection] Load Localisations',
  LoadSuccess = '[Collection] Load Localisations Success',
  LoadFail = '[Collection] Load Localisations Fail',
}

/**
 * Add Localisation to Collection Actions
 */
export class AddLocalisation implements Action {
  readonly type = CollectionActionTypes.AddLocalisation;

  constructor(public payload: Localisation) {}
}

export class AddLocalisationSuccess implements Action {
  readonly type = CollectionActionTypes.AddLocalisationSuccess;

  constructor(public payload: Localisation) {}
}

export class AddLocalisationFail implements Action {
  readonly type = CollectionActionTypes.AddLocalisationFail;

  constructor(public payload: Localisation) {}
}

/**
 * Remove Localisation from Collection Actions
 */
export class RemoveLocalisation implements Action {
  readonly type = CollectionActionTypes.RemoveLocalisation;

  constructor(public payload: Localisation) {}
}

export class RemoveLocalisationSuccess implements Action {
  readonly type = CollectionActionTypes.RemoveLocalisationSuccess;

  constructor(public payload: Localisation) {}
}

export class RemoveLocalisationFail implements Action {
  readonly type = CollectionActionTypes.RemoveLocalisationFail;

  constructor(public payload: Localisation) {}
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = CollectionActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = CollectionActionTypes.LoadSuccess;

  constructor(public payload: Localisation[]) {}
}

export class LoadFail implements Action {
  readonly type = CollectionActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type CollectionActions =
  | AddLocalisation
  | AddLocalisationSuccess
  | AddLocalisationFail
  | RemoveLocalisation
  | RemoveLocalisationSuccess
  | RemoveLocalisationFail
  | Load
  | LoadSuccess
  | LoadFail;
