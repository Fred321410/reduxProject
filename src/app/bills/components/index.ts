import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material';
import {BillPreviewComponent} from './bill-preview';
import {BillPreviewListComponent} from './bill-preview-list';
import { BillAddComponent } from './bill-add';

export const COMPONENTS = [
  BillPreviewComponent,
  BillPreviewListComponent,
  BillAddComponent
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
