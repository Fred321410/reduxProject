import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Bill} from '../models/bill';
import { detailExpandAnimation } from '../../shared/animations';
import {Localisation} from '../../localisations/models/localisation';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'rp-bill-preview-list',
  animations: [detailExpandAnimation],
  template: `
    <div class="container-bill">
      <button style="margin-bottom: 15px" mat-raised-button routerLink="add"><mat-icon>add</mat-icon>Ajouter</button>
      <table mat-table [dataSource]='bills'  multiTemplateDataRows class='mat-elevation-z8'>
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef> Date </th>
          <td mat-cell *matCellDef="let element"> {{element.date | date:'dd/MM/yyyy'}} </td>
        </ng-container>

        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef> Montant </th>
          <td mat-cell *matCellDef="let element"> {{element.amount}} </td>
        </ng-container>

        <ng-container matColumnDef="localisation">
          <th mat-header-cell *matHeaderCellDef> Lieu </th>
          <td mat-cell *matCellDef="let element"> {{element.localisation?.name}} </td>
        </ng-container>

        <ng-container matColumnDef="types">
          <th mat-header-cell *matHeaderCellDef> Type de lieu </th>
          <td mat-cell *matCellDef="let element">
            <mat-chip-list>
              <mat-chip *ngFor="let type of element.localisation?.types" selected color="primary">{{type.name}}</mat-chip>
            </mat-chip-list>
          </td>
        </ng-container>

        <ng-container matColumnDef="prelevementType">
          <th mat-header-cell *matHeaderCellDef> Type de prélèvement </th>
          <td mat-cell *matCellDef="let element"> {{element.prelevementType}} </td>
        </ng-container>

        <ng-container matColumnDef="expandedDetail">
          <td mat-cell *matCellDef="let element" [attr.colspan]="getDisplayedColumns().length">
            <div class="example-element-detail"
                 [@detailExpandAnimation]="element == expandedElement ? 'expanded' : 'collapsed'">
              <div class="example-element-description">
                {{element.description}}
              </div>
              <mat-divider *ngIf="element.description && element.types && element.types.length > 0"
                           [vertical]="true"></mat-divider>
              <mat-chip-list [ngClass]="{'add-margin': element.description}">
                <mat-chip *ngFor="let type of element?.types" selected color="primary">{{type}}</mat-chip>
              </mat-chip-list>
              <div class="button-row" style="margin-left: auto;">
                <button mat-icon-button (click)="update(element)">
                  <mat-icon color="accent">edit</mat-icon>
                </button>
                <button mat-icon-button>
                  <mat-icon color="accent">delete</mat-icon>
                </button>
              </div>
            </div>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="getDisplayedColumns()"></tr>
        <tr mat-row *matRowDef="let element; columns: getDisplayedColumns();"
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

  columnsToDisplay = [{def: 'date', showMobile: true},
    {def: 'amount', showMobile: true},
    {def: 'localisation', showMobile: true},
    {def: 'types', showMobile: false},
    {def: 'prelevementType', showMobile: false}];

  constructor(private router: Router, private route: ActivatedRoute) {}

  update(bill: Bill) {
    this.router.navigate(['add'], { relativeTo: this.route, queryParams: { id: bill.id} });
  }

  getDisplayedColumns(): string[] {
    const isMobile = false; // TODO Gestion de la taille de l'écran
    return this.columnsToDisplay
      .filter(cd => !isMobile || cd.showMobile)
      .map(cd => cd.def);
  }
}
