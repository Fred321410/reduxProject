import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBills from '../reducers';
import * as collection from '../actions/collections';
import { Bill } from '../models/bill';

@Component({
  selector: 'rp-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>My Collection</mat-card-title>
    </mat-card>
  `,
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   */
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

  constructor(private store: Store<fromBills.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
  }
}
