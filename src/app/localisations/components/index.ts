import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material';
import { LocalisationPreviewListComponent } from './localisation-preview-list';
import { LocalisationAddComponent } from './localisation-add';
import { LocalisationPreviewComponent } from './localisation-preview';
import { PipesModule } from '../../shared/pipes';


export const COMPONENTS = [
  LocalisationPreviewListComponent,
  LocalisationAddComponent,
  LocalisationPreviewComponent
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
