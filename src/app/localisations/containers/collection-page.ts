import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromLocalisation from '../reducers';
import * as collection from '../actions/collections';

@Component({
  selector: 'rp-collection-localisation-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rp-localisation-preview-list></rp-localisation-preview-list>
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

  constructor(private store: Store<fromLocalisation.State>) {
  }

  ngOnInit() {
    // this.store.dispatch(new collection.Load());
  }
}
