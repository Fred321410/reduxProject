import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromType from '../reducers';
import * as collection from '../actions/collections';
import { Type } from '../models/type';

@Component({
  selector: 'rp-collection-type-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rp-type-preview-list [types]="types$ | async" (expendPanel)="expendPanel($event)"></rp-type-preview-list>
  `,
})
export class CollectionPageComponent implements OnInit {

  types$: Observable<Type[]>;

  constructor(private store: Store<fromType.State>) {
    this.types$ = store.pipe(select(fromType.getTypeCollection));
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
  }

  expendPanel(type: Type) {
    this.store.dispatch(new collection.ExpendTypePanel(type));
  }
}
