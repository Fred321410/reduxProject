import {Component, ChangeDetectionStrategy, HostBinding, OnInit} from '@angular/core';
import { Bill } from '../models/bill';

import * as fromBills from '../reducers';
import * as collection from '../actions/collections';
import { slideInOutAnimation } from '../../shared/animations';
import {Observable} from 'rxjs';
import {Localisation} from '../../localisations/models/localisation';
import {select, Store} from '@ngrx/store';
import * as fromLocalisation from '../../localisations/reducers';
import * as fromPrelevementTypes from '../../prelevementTypes/reducers';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'rp-bill-add-page',
  animations: [slideInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rp-bill-add [localisations]="localisation$ | async" [prelevementTypes]="prelevementTypes$ | async"
                 [bills] = "bills$ | async" [billId]="billId"
                 (submitted)="onSubmit($event)"
                 (cancelEvent)="onCancel()"></rp-bill-add>
  `,
})
export class BIllAddPageComponent implements OnInit{

  @HostBinding('@slideInOutAnimation')
  public slideInOutAnimation = true;
  localisation$: Observable<Localisation[]>;
  prelevementTypes$: Observable<string[]>;
  bills$: Observable<Bill[]>;

  billId: string;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromBills.State>) {
    this.localisation$ = store.pipe(select(fromLocalisation.getLocalisationCollection));
    this.prelevementTypes$ = store.pipe(select(fromPrelevementTypes.getCollectionPrelevementTypes));
    this.bills$ = store.pipe(select(fromBills.getBillCollection));
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.billId = (params['id'] || 0);
      });
  }

  onSubmit($event: Bill) {
    if (this.billId) {
      $event.id = this.billId
      this.store.dispatch(new collection.UpdateBill($event));
    } else {
      this.store.dispatch(new collection.AddBill($event));
    }
  }

  onCancel() {
      this.store.dispatch(new collection.AddBillCancel());
  }

}
