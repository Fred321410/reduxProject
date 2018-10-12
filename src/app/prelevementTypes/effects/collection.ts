import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import {
  LoadFail,
  LoadSuccess,
  CollectionActionTypes
} from '../actions/collections';
import {exhaustMap, map, catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

@Injectable()
export class CollectionEffects {

  @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.Load),
    exhaustMap(() =>
      this.http.get('http://localhost:9000/api/prelevementTypes').pipe(
        // If successful, dispatch success action with result
        map((prelevementTypes: string[]) => new LoadSuccess(prelevementTypes)),
        // If request fails, dispatch failed action
        catchError(error => of(new LoadFail(error)))
      )
    )
  );

  constructor(private http: HttpClient, private actions$: Actions, private router: Router) {}
}
