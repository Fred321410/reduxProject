import { Action } from '@ngrx/store';
import { Bill } from '../models/bill';
import {Update} from '@ngrx/entity';
import {SortBill} from '../models/sortBill';

export enum CollectionActionTypes {
  AddBill = '[Collection] Add Bill',
  AddBillSuccess = '[Collection] Add Bill Success',
  AddBillFail = '[Collection] Add Bill Fail',
  UpdateBill = '[Collection] Update Bill',
  UpdateBillSuccess = '[Collection] Update Bill Success',
  UpdateBillFail = '[Collection] Update Bill Fail',
  AddBillCancel = '[Collection] Add Bill Cancel',
  RemoveBill = '[Collection] Remove Bill',
  RemoveBillSuccess = '[Collection] Remove Bill Success',
  RemoveBillFail = '[Collection] Remove Bill Fail',
  Load = '[Collection] Load Bills',
  LoadSuccess = '[Collection] Load Bills Success',
  LoadFail = '[Collection] Load Bills Fail',
  ExpendBillRow = '[Collection] Expend Row',
  ChangeStickyHeaders = '[Collection] Change Sticky Headers',
  SortingBills = '[Collection] Sorting Bills'
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

export class UpdateBill implements Action {
  readonly type = CollectionActionTypes.UpdateBill;

  constructor(public payload: Bill) {}
}

export class UpdateBillSuccess implements Action {
  readonly type = CollectionActionTypes.UpdateBillSuccess;

  constructor(public payload: {bill: Update<Bill>}) {}
}

export class UpdateBillFail implements Action {
  readonly type = CollectionActionTypes.UpdateBillFail;

  constructor(public payload: Bill) {}
}

export class AddBillCancel implements Action {
  readonly type = CollectionActionTypes.AddBillCancel;

  constructor() {}
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

  constructor(public payload: { id: string }) {}
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

export class ExpendBillRow implements Action {
  readonly type = CollectionActionTypes.ExpendBillRow;

  constructor(public payload: Bill) {}
}

export class ChangeStickyHeaders implements Action {
  readonly type = CollectionActionTypes.ChangeStickyHeaders;

  constructor(public payload: boolean) {}
}


export class SortingBills implements Action {
  readonly type = CollectionActionTypes.SortingBills;

  constructor(public payload: SortBill) {}
}

export type CollectionActions =
  | AddBill
  | AddBillSuccess
  | AddBillFail
  | UpdateBill
  | UpdateBillSuccess
  | UpdateBillFail
  | AddBillCancel
  | RemoveBill
  | RemoveBillSuccess
  | RemoveBillFail
  | Load
  | LoadSuccess
  | LoadFail
  | ExpendBillRow
  | SortingBills
  | ChangeStickyHeaders;
