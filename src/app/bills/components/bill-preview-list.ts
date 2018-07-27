import { Component, Input } from '@angular/core';
import {Bill} from '../models/bill';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'rp-bill-preview-list',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  template: `
    <table mat-table [dataSource]='bills'  multiTemplateDataRows class='mat-elevation-z8'>
      <ng-container matColumnDef="{{column}}" *ngFor="let column of columnsToDisplay">
        <th mat-header-cell *matHeaderCellDef> {{column}} </th>
        <td mat-cell *matCellDef="let element"> {{element[column]}} </td>
      </ng-container>

      <ng-container matColumnDef="expandedDetail">
        <td mat-cell *matCellDef="let element" [attr.colspan]="columnsToDisplay.length">
          <div class="example-element-detail"
               [@detailExpand]="element == expandedElement ? 'expanded' : 'collapsed'">
            <div class="example-element-description">
              {{element.description}}
            </div>
          </div>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
      <tr mat-row *matRowDef="let element; columns: columnsToDisplay;"
          class="example-element-row"
          [class.example-expanded-row]="expandedElement === element"
          (click)="expandedElement = element">
      </tr>
      <tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="example-detail-row"></tr>
    </table>
<!--    <rp-bill-preview *ngFor="let bill of bills" [bill]="bill"></rp-bill-preview>-->
  `,
  styleUrls: ['./bill-preview-list.scss']
})
export class BillPreviewListComponent {
  @Input() bills: Bill[];

  columnsToDisplay = ['date', 'amount'];
  expandedElement: Bill; // TODO REDUX
}
