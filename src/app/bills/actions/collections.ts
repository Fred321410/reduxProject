import { Action } from '@ngrx/store';
import { Bill } from '../models/bill';

export enum CollectionActionTypes {
  AddBill = '[Collection] Add Bill',
  AddBillSuccess = '[Collection] Add Bill Success',
  AddBillFail = '[Collection] Add Bill Fail',
  RemoveBill = '[Collection] Remove Bill',
  RemoveBillSuccess = '[Collection] Remove Bill Success',
  RemoveBillFail = '[Collection] Remove Bill Fail',
  Load = '[Collection] Load',
  LoadSuccess = '[Collection] Load Success',
  LoadFail = '[Collection] Load Fail',
}

/**
 * Add Bill to Collection Actions
 */
export class AddBill implements Action {
  readonly type = CollectionActionTypes.AddBill;

  constructor(public payload: Bill) {}
}

export class AddBillSuccess implements Action {
  readonly type = CollectionActionTypes.AddBillSuccess;

  constructor(public payload: Bill) {}
}

export class AddBillFail implements Action {
  readonly type = CollectionActionTypes.AddBillFail;

  constructor(public payload: Bill) {}
}

/**
 * Remove Bill from Collection Actions
 */
export class RemoveBill implements Action {
  readonly type = CollectionActionTypes.RemoveBill;

  constructor(public payload: Bill) {}
}

export class RemoveBillSuccess implements Action {
  readonly type = CollectionActionTypes.RemoveBillSuccess;

  constructor(public payload: Bill) {}
}

export class RemoveBillFail implements Action {
  readonly type = CollectionActionTypes.RemoveBillFail;

  constructor(public payload: Bill) {}
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = CollectionActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = CollectionActionTypes.LoadSuccess;

  constructor(public payload: Bill[]) {}
}

export class LoadFail implements Action {
  readonly type = CollectionActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type CollectionActions =
  | AddBill
  | AddBillSuccess
  | AddBillFail
  | RemoveBill
  | RemoveBillSuccess
  | RemoveBillFail
  | Load
  | LoadSuccess
  | LoadFail;
