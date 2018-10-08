import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { HttpClient  } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import {
  LoadFail,
  LoadSuccess,
  CollectionActionTypes, AddLocalisation, AddLocalisationFail, AddLocalisationSuccess, UpdateLocalisation, UpdateLocalisationSuccess,
  UpdateLocalisationFail,
} from '../actions/collections';
import {exhaustMap, map, catchError, tap} from 'rxjs/operators';
import { Localisation } from '../models/localisation';
import {Router} from '@angular/router';

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

  @Effect()
  addLocalisationToCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.AddLocalisation),
    map((action: AddLocalisation) => action.payload),
    exhaustMap(localisation =>
      this.http.post('http://localhost:9000/api/localisations', localisation).pipe(
        // If successful, dispatch success action with result
        map((localisationAdded: Localisation) => new AddLocalisationSuccess(localisationAdded)),
        // If request fails, dispatch failed action
        catchError(error => of(new AddLocalisationFail(localisation)))
      )
    )
  );

  @Effect({ dispatch: false })
  addLocalisationSuccess$ = this.actions$.pipe(
    ofType(CollectionActionTypes.AddLocalisationSuccess),
    tap(() => this.router.navigate(['collection/localisations']))
  );

  @Effect()
  updateLocalisationToCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.UpdateLocalisation),
    map((action: UpdateLocalisation) => action.payload),
    exhaustMap(localisation =>
      this.http.post('http://localhost:9000/api/localisations/' + localisation.id, localisation).pipe(
        // If successful, dispatch success action with result
        map((localisationUpdated: Localisation) => new UpdateLocalisationSuccess({localisation: {id: localisationUpdated.id, changes: localisationUpdated}})),
        // If request fails, dispatch failed action
        catchError(error => of(new UpdateLocalisationFail(localisation)))
      )
    )
  );

  @Effect({ dispatch: false })
  updateLocalisationSuccess$ = this.actions$.pipe(
    ofType(CollectionActionTypes.UpdateLocalisationSuccess),
    tap(() => this.router.navigate(['collection/localisations']))
  );

  @Effect({ dispatch: false })
  addLocalisationCancel$ = this.actions$.pipe(
    ofType(CollectionActionTypes.AddLocalisationCancel),
    tap(() => this.router.navigate(['collection/localisations']))
  );


  constructor(private http: HttpClient, private actions$: Actions, private router: Router) {}
}
