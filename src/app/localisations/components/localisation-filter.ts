import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'rp-localisation-filter',
  template: `
    <h1 mat-dialog-title>Hi</h1>
    <div mat-dialog-content>
      <p>What's your favorite animal?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
    </div>
  `,
  styles: [
    `
  `,
  ],
})
export class LocalisationFilterComponent {
  constructor(
    public dialogRef: MatDialogRef<LocalisationFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
