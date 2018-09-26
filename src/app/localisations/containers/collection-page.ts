import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromLocalisation from '../reducers';
import * as collection from '../actions/collections';
import { Localisation } from '../models/localisation';

@Component({
  selector: 'rp-collection-localisation-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rp-localisation-preview-list [localisations]="localisations$ | async"
                                  [colsNumber]="colsNumber$ | async"
                                  (colsNumberEvent)="onResize($event)"></rp-localisation-preview-list>
  `,
})
export class CollectionPageComponent implements OnInit {

  localisations$: Observable<Localisation[]>;
  colsNumber$: Observable<number>;

  constructor(private store: Store<fromLocalisation.State>) {
    this.localisations$ = store.pipe(select(fromLocalisation.getLocalisationCollection));
    this.colsNumber$ = store.pipe(select(fromLocalisation.getCollectionColsNumber));
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
    this.store.dispatch(new collection.ReSize(window.innerWidth));
  }

  onResize(event) {
    this.store.dispatch(new collection.ReSize(event));
  }
}
