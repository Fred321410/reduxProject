import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material';

import { BillsRoutingModule } from './bills-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { CollectionPageComponent } from './containers/collection-page';
import { CollectionEffects } from './effects/collection';
import {ComponentsModule} from './components';
import { BIllAddPageComponent } from './containers/bill-add-page';
import {LocalisationsModule} from '../localisations/localisations.module';
import {PrelevementTypesModule} from '../prelevementTypes/prelevementTypes.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BillsRoutingModule,
    LocalisationsModule,
    PrelevementTypesModule,
    ComponentsModule,
        /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('bills', reducers),
    EffectsModule.forFeature([CollectionEffects]),
  ],
  declarations: [
    CollectionPageComponent,
    BIllAddPageComponent
  ],
  providers: [],
})
export class BillsModule {}
