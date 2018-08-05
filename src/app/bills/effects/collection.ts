import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { HttpClient  } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import {
  LoadFail,
  LoadSuccess,
  CollectionActionTypes,
  AddBill,
  AddBillSuccess,
  AddBillFail,
} from '../actions/collections';
import { Bill } from '../models/bill';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { Router } from '../../../../node_modules/@angular/router';


@Injectable()
export class CollectionEffects {

  @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.Load),
    exhaustMap(() =>
      this.http.get('http://localhost:9000/api/bills').pipe(
        // If successful, dispatch success action with result
        map((bills: Bill[]) => new LoadSuccess(bills)),
        // If request fails, dispatch failed action
        catchError(error => of(new LoadFail(error)))
      )
    )
  );

  @Effect()
  addBillToCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.AddBill),
    map((action: AddBill) => action.payload),
    exhaustMap(bill =>
      this.http.post('http://localhost:9000/api/bills', bill).pipe(
        // If successful, dispatch success action with result
        map((billAdded: Bill) => new AddBillSuccess(billAdded)),
        // If request fails, dispatch failed action
        catchError(error => of(new AddBillFail(bill)))
      )
    )
  );

  @Effect({ dispatch: false })
  addBillSuccess$ = this.actions$.pipe(
    ofType(CollectionActionTypes.AddBillSuccess),
    tap(() => this.router.navigate(['../']))
  );

  @Effect({ dispatch: false })
  addBillCancel$ = this.actions$.pipe(
    ofType(CollectionActionTypes.AddBillCancel),
    tap(() => this.router.navigate(['../']))
  );

  constructor(private http: HttpClient, private actions$: Actions, private router: Router) {}
}
