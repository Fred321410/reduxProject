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
    <rp-localisation-preview-list [localisations]="localisations$ | async"></rp-localisation-preview-list>
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

  localisations$: Observable<Localisation[]>;

  constructor(private store: Store<fromLocalisation.State>) {
    this.localisations$ = store.pipe(select(fromLocalisation.getLocalisationCollection));
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
  }
}
