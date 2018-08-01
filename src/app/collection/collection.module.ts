import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material';

import { CollectionRoutingModule } from './collection-routing.module';

import { CollectionPageComponent } from './containers/collection-page';
import {ComponentsModule} from './components';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CollectionRoutingModule,
    ComponentsModule,
        /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
  ],
  declarations: [
    CollectionPageComponent,
  ],
  providers: [],
})
export class CollectionModule {}
