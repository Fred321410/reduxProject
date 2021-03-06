import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { CollectionPageComponent } from './containers/collection-page';
import { CollectionEffects } from './effects/collection';
import {ComponentsModule} from './components';
import { LocalisationsRoutingModule } from './localisations-routing.module';
import {LocalisationAddPageComponent} from './containers/localisation-add-page';
import {TypesModule} from '../types/types.module';
import {LocalisationFilterComponent} from './components/localisation-filter';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    LocalisationsRoutingModule,
    ComponentsModule,
    TypesModule,
        /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('localisations', reducers),
    EffectsModule.forFeature([CollectionEffects]),
  ],
  declarations: [
    CollectionPageComponent,
    LocalisationAddPageComponent,
    LocalisationFilterComponent
  ],
  entryComponents: [LocalisationFilterComponent],
  providers: [],
})
export class LocalisationsModule {}
