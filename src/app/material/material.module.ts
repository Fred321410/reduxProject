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
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ]
})
export class MaterialModule {}
