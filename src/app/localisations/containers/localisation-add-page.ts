import {Component, ChangeDetectionStrategy, HostBinding, OnInit} from '@angular/core';

import * as fromLocalisations from '../reducers';
import * as collection from '../actions/collections';
import { slideInOutAnimation } from '../../shared/animations';
import {Localisation} from '../models/localisation';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromType from '../../types/reducers';
import * as fromLocalisation from '../reducers';
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
    [localisations] = "localisations$ | async"
    [localisationId] = "localisationId"
    (cancelEvent)="onCancel()"></rp-localisation-add>
  `,
})
export class LocalisationAddPageComponent implements OnInit {

    @HostBinding('@slideInOutAnimation')
    public slideInOutAnimation = true;
    types$: Observable<Type[]>;
    localisations$: Observable<Localisation[]>;

    localisationId: string;

    constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromLocalisations.State>) {
      this.types$ = store.pipe(select(fromType.getTypeCollection));
      this.localisations$ = store.pipe(select(fromLocalisation.getLocalisationCollection));
    }

    ngOnInit() {
      this.route
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          this.localisationId = (params['id'] || 0);
        });
    }

    onSubmit($event: Localisation) {
      if (this.localisationId) {
        $event.id = this.localisationId;
        this.store.dispatch(new collection.UpdateLocalisation($event));
      } else {
        this.store.dispatch(new collection.AddLocalisation($event));
      }
    }

    onCancel() {
      this.store.dispatch(new collection.AddLocalisationCancel());
    }

}
