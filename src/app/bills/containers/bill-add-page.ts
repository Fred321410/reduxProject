import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Bill } from '../models/bill';
import { Router } from '../../../../node_modules/@angular/router';
import { Store } from '../../../../node_modules/@ngrx/store';

import * as fromBills from '../reducers';
import * as collection from '../actions/collections';
import { slideInOutAnimation } from '../../shared/animations';

@Component({
  selector: 'rp-bill-add-page',
  animations: [slideInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rp-bill-add
    (submitted)="onSubmit($event)"
    (cancelEvent)="onCancel()"></rp-bill-add>
  `,
})
export class BIllAddPageComponent {

    @HostBinding('@slideInOutAnimation')
    public slideInOutAnimation = true;

    constructor(private router: Router, private store: Store<fromBills.State>) { }

    onSubmit($event: Bill) {
        this.store.dispatch(new collection.AddBill($event));
    }

    onCancel() {
        this.store.dispatch(new collection.AddBillCancel());
    }

}
