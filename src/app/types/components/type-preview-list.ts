import {Component, Input} from '@angular/core';
import { Type } from '../models/type';

@Component({
  selector: 'rp-type-preview-list',
  template: `
    <div class="container-type">
      <button style="margin-bottom: 15px" mat-raised-button routerLink="add"><mat-icon>add</mat-icon>Ajouter</button>
      <mat-accordion>
        <rp-type-preview *ngFor="let type of types" [type]="type"></rp-type-preview>
      </mat-accordion>
      <div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./type-preview-list.scss']
})
export class TypePreviewListComponent {
  @Input() types: Type[];
}
