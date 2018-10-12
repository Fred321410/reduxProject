import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Bill} from '../models/bill';
import { detailExpandAnimation } from '../../shared/animations';
import {Localisation} from '../../localisations/models/localisation';

@Component({
  selector: 'rp-bill-preview-list',
  animations: [detailExpandAnimation],
  template: `
    <div class="container-bill">
      <button style="margin-bottom: 15px" mat-raised-button routerLink="add"><mat-icon>add</mat-icon>Ajouter</button>
      <table mat-table [dataSource]='bills'  multiTemplateDataRows class='mat-elevation-z8'>
      <ng-container matColumnDef="{{column}}" *ngFor="let column of columnsToDisplay">
        <th mat-header-cell *matHeaderCellDef> {{column}} </th>
        <td mat-cell *matCellDef="let element"> {{element[column]}} </td>
      </ng-container>

        <ng-container matColumnDef="expandedDetail">
          <td mat-cell *matCellDef="let element" [attr.colspan]="columnsToDisplay.length">
            <div class="example-element-detail"
                 [@detailExpandAnimation]="element == expandedElement ? 'expanded' : 'collapsed'">
              <div class="example-element-description">
                {{element.description}}
              </div>
              <div class="button-row" style="margin-left: auto;">
                <button mat-icon-button>
                  <mat-icon color="accent">edit</mat-icon>
                </button>
                <button mat-icon-button>
                  <mat-icon color="accent">delete</mat-icon>
                </button>
              </div>
            </div>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
        <tr mat-row *matRowDef="let element; columns: columnsToDisplay;"
            class="example-element-row"
            [class.example-expanded-row]="expandedElement === element"
            (click)="expendElement.emit(element)">
        </tr>
        <tr>

        </tr>
        <tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="example-detail-row"></tr>
      </table>
    </div>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./bill-preview-list.scss']
})
export class BillPreviewListComponent {
  @Input() bills: Bill[];
  @Input() localisations: Localisation[];
  @Input() expandedElement: Bill;
  @Output() expendElement = new EventEmitter<Bill>();


  columnsToDisplay = ['date', 'amount'];
}
