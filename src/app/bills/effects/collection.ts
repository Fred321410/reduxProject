import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import {
  LoadFail,
  LoadSuccess,
  CollectionActionTypes,
} from './../actions/collections';
import { Bill } from '../models/bill';
import { switchMap, toArray, map, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class CollectionEffects {


/*   @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.Load),
    switchMap(() =>
      this.db
        .query('books')
        .pipe(
          toArray(),
          map((books: Book[]) => new LoadSuccess(books)),
          catchError(error => of(new LoadFail(error)))
        )
    )
  ); */

  constructor(private actions$: Actions) {}
}
