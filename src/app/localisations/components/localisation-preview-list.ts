import { Component, Input } from '@angular/core';
import { detailExpandAnimation } from '../../shared/animations';
import { Localisation, generateMockLocalisation } from '../models/localisation';

@Component({
  selector: 'rp-localisation-preview-list',
  animations: [detailExpandAnimation],
  template: `
    <div class="container-localisation">
      <button style="margin-bottom: 15px" mat-raised-button (click)="add()"><mat-icon>add</mat-icon>Ajouter</button>
      <rp-localisation-preview *ngFor="let localisation of localisationsTest" [localisation]="localisation"></rp-localisation-preview>
      <div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./localisation-preview-list.scss']
})
export class LocalisationPreviewListComponent {
  @Input() localisations: Localisation[];

  localisationsTest = [generateMockLocalisation()];

  add() {
    this.localisationsTest.push(generateMockLocalisation());
  }
}
