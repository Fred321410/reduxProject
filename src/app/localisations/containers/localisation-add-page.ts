import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import * as fromLocalisations from '../reducers';
import * as collection from '../actions/collections';
import { slideInOutAnimation } from '../../shared/animations';
import {Localisation} from '../models/localisation';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
  selector: 'rp-localisation-add-page',
  animations: [slideInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rp-localisation-add
    (submitted)="onSubmit($event)"
    (cancelEvent)="onCancel()"></rp-localisation-add>
  `,
})
export class LocalisationAddPageComponent {

    @HostBinding('@slideInOutAnimation')
    public slideInOutAnimation = true;

    constructor(private router: Router, private store: Store<fromLocalisations.State>) { }

    onSubmit($event: Localisation) {
      this.store.dispatch(new collection.AddLocalisation($event));
    }

    onCancel() {
      this.store.dispatch(new collection.AddLocalisationCancel());
    }

}
