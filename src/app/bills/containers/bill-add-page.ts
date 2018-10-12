import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Bill } from '../models/bill';

import * as fromBills from '../reducers';
import * as collection from '../actions/collections';
import { slideInOutAnimation } from '../../shared/animations';
import {Observable} from 'rxjs';
import {Localisation} from '../../localisations/models/localisation';
import {select, Store} from '@ngrx/store';
import * as fromLocalisation from '../../localisations/reducers';
import * as fromPrelevementTypes from '../../prelevementTypes/reducers';
import {Router} from '@angular/router';

@Component({
  selector: 'rp-bill-add-page',
  animations: [slideInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rp-bill-add [localisations]="localisation$ | async" [prelevementTypes]="prelevementTypes$ | async"
    (submitted)="onSubmit($event)"
    (cancelEvent)="onCancel()"></rp-bill-add>
  `,
})
export class BIllAddPageComponent {

    @HostBinding('@slideInOutAnimation')
    public slideInOutAnimation = true;
    localisation$: Observable<Localisation[]>;
    prelevementTypes$: Observable<string[]>;

    constructor(private router: Router, private store: Store<fromBills.State>) {
      this.localisation$ = store.pipe(select(fromLocalisation.getLocalisationCollection));
      this.prelevementTypes$ = store.pipe(select(fromPrelevementTypes.getCollectionPrelevementTypes));
    }

    onSubmit($event: Bill) {
        this.store.dispatch(new collection.AddBill($event));
    }

    onCancel() {
        this.store.dispatch(new collection.AddBillCancel());
    }

}
