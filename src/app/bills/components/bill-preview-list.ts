import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Bill} from '../models/bill';
import { detailExpandAnimation } from '../../shared/animations';
import {Localisation} from '../../localisations/models/localisation';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {SortBill} from '../models/sortBill';
import {CheckDeviceService} from '../../core/services/ckech.device.service';

@Component({
  selector: 'rp-bill-preview-list',
  animations: [detailExpandAnimation],
  template: `
    <div class="container-bill">
      <button style="margin-bottom: 15px" mat-raised-button (click)="add()"><mat-icon>add</mat-icon>Ajouter</button>
      <table mat-table [dataSource]='dataSource' matSort (matSortChange)="sortingBills.emit($event)"
             multiTemplateDataRows class='mat-elevation-z8'>
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>
          <td mat-cell *matCellDef="let element"> {{element.date | date:'dd/MM/yyyy'}} </td>
          <td mat-footer-cell *matFooterCellDef> Total </td>
        </ng-container>

        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Montant </th>
          <td mat-cell *matCellDef="let element" [style.color]="element.isDebit ? 'red' : 'green'"> {{element.amount}} </td>
          <td mat-footer-cell *matFooterCellDef> {{getTotalCost() | currency: 'EUR'}} </td>
        </ng-container>

        <ng-container matColumnDef="localisation">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Lieu </th>
          <td mat-cell *matCellDef="let element"> {{element.localisation?.name}} </td>
          <td mat-footer-cell *matFooterCellDef>
          </td>
        </ng-container>

        <ng-container matColumnDef="types">
          <th mat-header-cell *matHeaderCellDef> Type de lieu </th>
          <td mat-cell *matCellDef="let element">
            <mat-chip-list>
              <mat-chip *ngFor="let type of element.localisation?.types" selected color="primary">{{type.name}}</mat-chip>
            </mat-chip-list>
          </td>
          <td mat-footer-cell *matFooterCellDef></td>
        </ng-container>

        <ng-container matColumnDef="prelevementType">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Type de prélèvement </th>
          <td mat-cell *matCellDef="let element"> {{element.prelevementType}} </td>
          <td mat-footer-cell *matFooterCellDef></td>
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
                  <mat-icon color="accent" (click)="deleteBill(element)">delete</mat-icon>
                </button>
              </div>
            </div>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="getDisplayedColumns(); sticky: getStickyHeaders()"></tr>
        <tr mat-row *matRowDef="let element; columns: getDisplayedColumns();"
            class="example-element-row"
            [class.example-expanded-row]="expandedElement === element"
            (click)="expendElement.emit(element)">
        </tr>
        <tr>

        </tr>
        <tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="example-detail-row"></tr>
        <tr mat-footer-row *matFooterRowDef="getDisplayedColumns(); sticky: getStickyHeaders()"></tr>
      </table>
    </div>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./bill-preview-list.scss']
})
export class BillPreviewListComponent {
  private _bills: Bill[];
  private _sortBill: SortBill;
  get bills(): Bill[] {
    return this._bills;
  }

  @Input()
  set bills(bills: Bill[]) {
    this._bills = bills;
    this.sortData(this.sortBill);
  }
  get sortBill(): SortBill {
    return this._sortBill;
  }

  @Input()
  set sortBill(sortBill: SortBill) {
    this._sortBill = sortBill;
    this.sortData(sortBill);
  }
  @Input() localisations: Localisation[];
  @Input() expandedElement: Bill;
  @Input() stickyHeader: boolean;
  @Output() expendElement = new EventEmitter<Bill>();
  @Output() changeStickyHeaders = new EventEmitter<boolean>();
  @Output() sortingBills = new EventEmitter<SortBill>();
  @Output() removeBill = new EventEmitter<Bill>();
  dataSource: MatTableDataSource<Bill>;

  columnsToDisplay = [{def: 'date', showMobile: true},
    {def: 'amount', showMobile: true},
    {def: 'localisation', showMobile: true},
    {def: 'types', showMobile: false},
    {def: 'prelevementType', showMobile: false}];

  constructor(private router: Router, private route: ActivatedRoute) {}

  update(bill: Bill) {
    this.router.navigate(['add'], { relativeTo: this.route, queryParams: { id: bill.id} });
  }

  add() {
    this.changeStickyHeaders.emit(false);
    this.router.navigate(['add'], { relativeTo: this.route});
  }

  deleteBill(bill: Bill) {
    this.removeBill.emit(bill);
  }

  getDisplayedColumns(): string[] {
    const isMobile = CheckDeviceService.isMobile();
    return this.columnsToDisplay
      .filter(cd => !isMobile || cd.showMobile)
      .map(cd => cd.def);
  }

  getStickyHeaders(): boolean {
    return this.stickyHeader;
  }

  sortData(event: SortBill): void {
    if (event && event.direction !== '') {
      const direction = (event.direction === 'asc') ? -1 : 1;
      let billsSorted = this.bills;
      switch (event.active) {
        case 'date':
          billsSorted = this.bills.sort(function (a: Bill, b: Bill) {
            return (new Date(a.date).getTime() - new Date(b.date).getTime()) * direction;
          });
          break;
        case 'amount':
          billsSorted = this.bills.sort(function (a: Bill, b: Bill) {
            let aSigned = a.amount * -1;
            let bSigned = b.amount * -1;
            if (!a.isDebit) {
              aSigned = aSigned * -1;
            }
            if (!b.isDebit) {
              bSigned = bSigned * -1;
            }
            return (aSigned - bSigned) * direction;
          });
          break;
        case 'localisation':
          billsSorted = this.bills.sort(function (a: Bill, b: Bill) {
            return a.localisation.name.localeCompare(b.localisation.name) * direction;
          });
          break;
        case 'prelevementType':
          billsSorted = this.bills.sort(function (a: Bill, b: Bill) {
            return a.prelevementType.localeCompare(b.prelevementType) * direction;
          });
          break;
      }
      this.dataSource = new MatTableDataSource<Bill>(billsSorted);
    }
  }

  getTotalCost() {
    return this.bills.map(b => b.isDebit ? -b.amount : b.amount).reduce((acc, value) => acc + value, 0);
  }
  getTotalDebit() {
    return this.bills.filter(b => b.isDebit).map(b => b.amount).reduce((acc, value) => acc + value, 0);
  }
  getTotalCredit() {
    return this.bills.filter(b => !b.isDebit).map(b => b.amount).reduce((acc, value) => acc + value, 0);
  }
}
