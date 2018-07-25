import { Component, Input } from '@angular/core';
import {Bill} from '../models/bill';

@Component({
  selector: 'rp-bill-preview',
  template: `
    <a [routerLink]="['/bills', id]">
        <mat-card [ngStyle]="{'padding':'0px'}">
          <div [class]="'card-'+year" style="width: 100%; height: 5px"></div>
          <mat-card-title-group>
            <mat-card-title>{{description}}</mat-card-title>
          </mat-card-title-group>
        </mat-card>
    </a>
  `,
  styleUrls: ['./bill-preview.scss'],
})
export class BillPreviewComponent {
  @Input() bill: Bill;

  get id() {
    return this.bill.id;
  }

  get description() {
    return this.bill.description;
  }

  get year() {
    return '2018';
  }

}
