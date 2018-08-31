import {Component, Input, OnInit} from '@angular/core';
import { detailExpandAnimation } from '../../shared/animations';
import { Localisation, generateMockLocalisation } from '../models/localisation';

@Component({
  selector: 'rp-localisation-preview-list',
  animations: [detailExpandAnimation],
  template: `
    <div class="container-localisation">
      <button style="margin-bottom: 15px" mat-raised-button (click)="add()"><mat-icon>add</mat-icon>Ajouter</button>
      <mat-grid-list cols="{{colsNumber}}" rowHeight="130" (window:resize)="onResize($event)">
        <mat-grid-tile *ngFor="let localisation of localisationsTest">
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
export class LocalisationPreviewListComponent implements OnInit {
  @Input() localisations: Localisation[];

  colsNumber: number;

  localisationsTest = [generateMockLocalisation()];

  ngOnInit() {
    if (window.innerWidth <= 448) {
      this.colsNumber = 1;
    } else {
      this.colsNumber = (window.innerWidth % 448 > 60) ? Math.trunc(window.innerWidth / 448) : Math.trunc(window.innerWidth / 448) - 1;
    }
  }

  onResize(event) {
    if (event.target.innerWidth <= 448) {
      this.colsNumber = 1;
    } else {
      this.colsNumber = (event.target.innerWidth % 448 > 60) ?
        Math.trunc(event.target.innerWidth / 448) :
        Math.trunc(event.target.innerWidth / 448) - 1;
    }
  }

  add() {
    this.localisationsTest.push(generateMockLocalisation());
  }
}
