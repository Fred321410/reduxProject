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
} from './../actions/collections';
import { Bill } from '../models/bill';
import { exhaustMap, map, catchError } from 'rxjs/operators';


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


  constructor(private http: HttpClient, private actions$: Actions) {}
}
