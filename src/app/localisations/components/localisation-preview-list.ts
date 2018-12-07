import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { Localisation } from '../models/localisation';
import {MatDialog} from '@angular/material';
import {LocalisationFilterComponent} from './localisation-filter';

@Component({
  selector: 'rp-localisation-preview-list',
  template: `
    <div class="container-localisation">
      <div style="display: inline-flex">
        <button style="margin-bottom: 15px" mat-raised-button routerLink="add"><mat-icon>add</mat-icon>Ajouter</button>
        <div #filter style="margin-left: 15px">
          <button  mat-raised-button (click)="openDialog()"><mat-icon>filter_list</mat-icon>Filtres</button>
        </div>
      </div>
      <mat-grid-list cols="{{colsNumber}}" rowHeight="200" (window:resize)="colsNumberEvent.emit($event.target.innerWidth)">
        <mat-grid-tile *ngFor="let localisation of localisations">
          <rp-localisation-preview [localisation]="localisation"></rp-localisation-preview>
        </mat-grid-tile>
      </mat-grid-list>
      <div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./localisation-preview-list.scss']
})
export class LocalisationPreviewListComponent {
  @Input() localisations: Localisation[];
  @Input() colsNumber: number;
  @Output() colsNumberEvent = new EventEmitter<number>();

  constructor(public dialog: MatDialog) {}

  @ViewChild('filter') el: ElementRef;

  openDialog(): void {
    const rect = this.el.nativeElement;
    console.log(this.el);
    const dialogRef = this.dialog.open(LocalisationFilterComponent, {
      width: '250px',
      backdropClass: 'none',
      position: {
        top: (rect.clientHeight - 15) + rect.offsetTop + 'px',
        left: rect.offsetLeft + 'px'
      },
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
