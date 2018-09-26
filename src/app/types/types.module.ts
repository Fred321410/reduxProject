import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { CollectionPageComponent } from './containers/collection-page';
import { CollectionEffects } from './effects/collection';
import {ComponentsModule} from './components';
import { TypesRoutingModule } from './types-routing.module';
import {TypeAddPageComponent} from './containers/type-add-page';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TypesRoutingModule,
    ComponentsModule,
        /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('types', reducers),
    EffectsModule.forFeature([CollectionEffects]),
  ],
  declarations: [
    CollectionPageComponent,
    TypeAddPageComponent
  ],
  providers: [],
})
export class TypesModule {}
