import { NgModule } from '@angular/core';


import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatTableModule,
  MatTabsModule,
  MatSelectModule,
  MatDatepickerModule,
  MatGridListModule,
  MatExpansionModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatSortModule,
  MatDialogModule,
  MAT_DATE_LOCALE,
} from '@angular/material';

import { MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatGridListModule,
    MatExpansionModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSortModule,
    MatDialogModule,
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatGridListModule,
    MatExpansionModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSortModule,
    MatDialogModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ]
})
export class MaterialModule {}
