import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import {
  LoadFail,
  LoadSuccess,
  CollectionActionTypes, AddType, AddTypeFail, AddTypeSuccess,
} from '../actions/collections';
import {exhaustMap, map, catchError, tap} from 'rxjs/operators';
import { Type } from '../models/type';
import {Router} from '@angular/router';
import {
  AddSousType, AddSousTypeFail, AddSousTypeSuccess, RemoveSousType, RemoveSousTypeFail, RemoveSousTypeSuccess,
  TypeActionTypes
} from '../actions/types';

const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

@Injectable()
export class CollectionEffects {

  @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.Load),
    exhaustMap(() =>
      this.http.get('http://localhost:9000/api/types').pipe(
        // If successful, dispatch success action with result
        map((types: Type[]) => new LoadSuccess(types)),
        // If request fails, dispatch failed action
        catchError(error => of(new LoadFail(error)))
      )
    )
  );

  @Effect()
  addTypeToCollection$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.AddType),
    map((action: AddType) => action.payload),
    exhaustMap(type =>
      this.http.post('http://localhost:9000/api/types', type).pipe(
        // If successful, dispatch success action with result
        map((typeAdded: Type) => new AddTypeSuccess(typeAdded)),
        // If request fails, dispatch failed action
        catchError(error => of(new AddTypeFail(type)))
      )
    )
  );

  @Effect()
  addSousType$: Observable<Action> = this.actions$.pipe(
    ofType(TypeActionTypes.AddSousType),
    map((action: AddSousType) => action.payload),
    exhaustMap(payload =>
      this.http.post('http://localhost:9000/api/types/' + payload.type.id + '/sousType', payload).pipe(
        // If successful, dispatch success action with result
        map((typeAdded: Type) => new AddSousTypeSuccess({type: {id: typeAdded.id, changes: typeAdded}})),
        // If request fails, dispatch failed action
        catchError(error => of(new AddSousTypeFail(payload)))
      )
    )
  );

  @Effect()
  removeSousType$: Observable<Action> = this.actions$.pipe(
    ofType(TypeActionTypes.RemoveSousType),
    map((action: RemoveSousType) => action.payload),
    exhaustMap(payload =>
      this.http.delete('http://localhost:9000/api/types/' + payload.type.id + '/sousType/' + payload.sousType).pipe(
        // If successful, dispatch success action with result
        map((typeAdded: Type) => new RemoveSousTypeSuccess({type: {id: typeAdded.id, changes: typeAdded}})),
        // If request fails, dispatch failed action
        catchError(error => of(new RemoveSousTypeFail(payload)))
      )
    )
  );

  @Effect({ dispatch: false })
  addTypeSuccess$ = this.actions$.pipe(
    ofType(CollectionActionTypes.AddTypeSuccess),
    tap(() => this.router.navigate(['collection/types']))
  );

  @Effect({ dispatch: false })
  addTypeCancel$ = this.actions$.pipe(
    ofType(CollectionActionTypes.AddTypeCancel),
    tap(() => this.router.navigate(['collection/types']))
  );


  constructor(private http: HttpClient, private actions$: Actions, private router: Router) {}
}
