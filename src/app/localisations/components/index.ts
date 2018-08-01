import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material';
import { LocalisationPreviewListComponent } from './localisation-preview-list';
import { LocalisationAddComponent } from './localisation-add';


export const COMPONENTS = [
  LocalisationPreviewListComponent,
  LocalisationAddComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
