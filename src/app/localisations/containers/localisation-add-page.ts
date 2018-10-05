import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import * as fromLocalisations from '../reducers';
import * as collection from '../actions/collections';
import { slideInOutAnimation } from '../../shared/animations';
import {Localisation} from '../models/localisation';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromType from '../../types/reducers';
import {Observable} from 'rxjs';
import {Type} from '../../types/models/type';

@Component({
  selector: 'rp-localisation-add-page',
  animations: [slideInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rp-localisation-add
    (submitted)="onSubmit($event)"
    [types] = "types$ | async"
    (cancelEvent)="onCancel()"></rp-localisation-add>
  `,
})
export class LocalisationAddPageComponent {

    @HostBinding('@slideInOutAnimation')
    public slideInOutAnimation = true;
    types$: Observable<Type[]>;

    constructor(private router: Router, private store: Store<fromLocalisations.State>) {
      this.types$ = store.pipe(select(fromType.getTypeCollection));
    }

    onSubmit($event: Localisation) {
      this.store.dispatch(new collection.AddLocalisation($event));
    }

    onCancel() {
      this.store.dispatch(new collection.AddLocalisationCancel());
    }

}
