import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material';
import { TypePreviewListComponent } from './type-preview-list';
import { TypeAddComponent } from './type-add';
import { PipesModule } from '../../shared/pipes';
import {TypePreviewComponent} from './type-preview';


export const COMPONENTS = [
  TypePreviewListComponent,
  TypeAddComponent,
  TypePreviewComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
