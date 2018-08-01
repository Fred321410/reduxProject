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
} from '../actions/collections';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Localisation } from '../models/localisation';


@Injectable()
export class CollectionEffects {

  @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.Load),
    exhaustMap(() =>
      this.http.get('http://localhost:9000/api/localisations').pipe(
        // If successful, dispatch success action with result
        map((localisations: Localisation[]) => new LoadSuccess(localisations)),
        // If request fails, dispatch failed action
        catchError(error => of(new LoadFail(error)))
      )
    )
  );


  constructor(private http: HttpClient, private actions$: Actions) {}
}
