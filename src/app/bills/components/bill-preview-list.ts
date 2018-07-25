import { Component, Input } from '@angular/core';
import {Bill} from '../models/bill';

@Component({
  selector: 'rp-bill-preview-list',
  template: `
    <rp-bill-preview *ngFor="let bill of bills" [bill]="bill"></rp-bill-preview>
  `,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
  ],
})
export class BillPreviewListComponent {
  @Input() bills: Bill[];
}
