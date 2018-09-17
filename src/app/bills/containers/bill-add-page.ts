import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Bill } from '../models/bill';
import { Router } from '../../../../node_modules/@angular/router';
import { Store } from '../../../../node_modules/@ngrx/store';

import * as fromBills from '../reducers';
import * as collection from '../actions/collections';
import { slideInOutAnimation } from '../../shared/animations';
import {Observable} from 'rxjs';
import {Localisation} from '../../localisations/models/localisation';
import {select} from '@ngrx/store';
import * as fromLocalisation from '../../localisations/reducers';

@Component({
  selector: 'rp-bill-add-page',
  animations: [slideInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rp-bill-add [localisations]="localisation$ | async"
    (submitted)="onSubmit($event)"
    (cancelEvent)="onCancel()"></rp-bill-add>
  `,
})
export class BIllAddPageComponent {

    @HostBinding('@slideInOutAnimation')
    public slideInOutAnimation = true;
    localisation$: Observable<Localisation[]>;

    constructor(private router: Router, private store: Store<fromBills.State>) {
      this.localisation$ = store.pipe(select(fromLocalisation.getLocalisationCollection));
    }

    onSubmit($event: Bill) {
        this.store.dispatch(new collection.AddBill($event));
    }

    onCancel() {
        this.store.dispatch(new collection.AddBillCancel());
    }

}
