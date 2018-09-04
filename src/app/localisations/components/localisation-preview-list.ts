import {Component, EventEmitter, Input, Output} from '@angular/core';
import { detailExpandAnimation } from '../../shared/animations';
import { Localisation, generateMockLocalisation } from '../models/localisation';

@Component({
  selector: 'rp-localisation-preview-list',
  animations: [detailExpandAnimation],
  template: `
    <div class="container-localisation">
      <button style="margin-bottom: 15px" mat-raised-button (click)="add()"><mat-icon>add</mat-icon>Ajouter</button>
      <mat-grid-list cols="{{colsNumber}}" rowHeight="130" (window:resize)="colsNumberEvent.emit($event.target.innerWidth)">
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
export class LocalisationPreviewListComponent {
  @Input() localisations: Localisation[];
  @Input() colsNumber: number;
  @Output() colsNumberEvent = new EventEmitter<number>();

  localisationsTest = [generateMockLocalisation()];

  add() {
    this.localisationsTest.push(generateMockLocalisation());
  }
}
