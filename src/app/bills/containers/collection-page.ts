import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBills from '../reducers';
import * as collection from '../actions/collections';
import { Bill } from '../models/bill';

@Component({
  selector: 'rp-collection-bills-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rp-bill-preview-list
    [bills]="bills$ | async"
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
  expendElement$: Observable<Bill>;

  constructor(private store: Store<fromBills.State>) {
    this.bills$ = store.pipe(select(fromBills.getBillCollection));
    this.expendElement$ = store.pipe(select(fromBills.getCollectionExpendElement));
  }

  expendElement(bill: Bill) {
    this.store.dispatch(new collection.ExpendBillRow(bill));
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
  }
}
