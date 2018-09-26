import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import * as fromTypes from '../reducers';
import * as collection from '../actions/collections';
import { slideInOutAnimation } from '../../shared/animations';
import {Type} from '../models/type';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
  selector: 'rp-type-add-page',
  animations: [slideInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rp-type-add
    (submitted)="onSubmit($event)"
    (cancelEvent)="onCancel()"></rp-type-add>
  `,
})
export class TypeAddPageComponent {

    @HostBinding('@slideInOutAnimation')
    public slideInOutAnimation = true;

    constructor(private router: Router, private store: Store<fromTypes.State>) { }

    onSubmit($event: Type) {
      this.store.dispatch(new collection.AddType($event));
    }

    onCancel() {
      this.store.dispatch(new collection.AddTypeCancel());
    }

}
