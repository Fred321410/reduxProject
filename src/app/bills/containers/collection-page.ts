import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBills from '../reducers';
import * as fromLocalisation from '../../localisations/reducers';
import * as collection from '../actions/collections';
import * as collectionLocalisation from '../../localisations/actions/collections';
import { Bill } from '../models/bill';
import {Localisation} from '../../localisations/models/localisation';

@Component({
  selector: 'rp-collection-bills-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rp-bill-preview-list
    [bills]="bills$ | async"
    [localisations]="localisation$ | async"
    [expandedElement]="expendElement$ | async"
    (expendElement)="expendElement($event)"></rp-bill-preview-list>
  `,
  styles: [
    `
    mat-card-title {
      display: flex;
      justify-content: center;
    }
  `,
  ],
})
export class CollectionPageComponent implements OnInit {
  bills$: Observable<Bill[]>;
  localisation$: Observable<Localisation[]>;
  expendElement$: Observable<Bill>;

  constructor(private store: Store<fromBills.State>) {
    this.bills$ = store.pipe(select(fromBills.getBillCollection));
    this.localisation$ = store.pipe(select(fromLocalisation.getLocalisationCollection));
    this.expendElement$ = store.pipe(select(fromBills.getCollectionExpendElement));
  }

  expendElement(bill: Bill) {
    this.store.dispatch(new collection.ExpendBillRow(bill));
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
    this.store.dispatch(new collectionLocalisation.Load());
  }
}
