import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromType from '../reducers';
import * as collection from '../actions/collections';
import * as typeActions from '../actions/types';
import { Type } from '../models/type';

@Component({
  selector: 'rp-collection-type-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rp-type-preview-list [types]="types$ | async"
                          [expendedPanel] = "expendPanel$ | async"
                          (expendPanel)="expendPanel($event)"
                          (addSousType)="addSousType($event)"
                          (removeSousType)="removeSousType($event)"></rp-type-preview-list>
  `,
})
export class CollectionPageComponent implements OnInit {

  types$: Observable<Type[]>;
  expendPanel$: Observable<Type>;

  constructor(private store: Store<fromType.State>) {
    this.types$ = store.pipe(select(fromType.getTypeCollection));
    this.expendPanel$ = store.pipe(select(fromType.getCollectionExpendPanel));
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
  }

  expendPanel(type: Type) {
    this.store.dispatch(new collection.ExpendTypePanel(type));
  }

  addSousType(payload) {
    this.store.dispatch(new typeActions.AddSousType(payload));
  }

  removeSousType(payload) {
    this.store.dispatch(new typeActions.RemoveSousType(payload));
  }
}
