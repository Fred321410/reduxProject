import { Component, Input } from '@angular/core';
import {Type} from '../models/type';

@Component({
  selector: 'rp-type-preview',
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          {{name}}
        </mat-panel-title>
        <mat-panel-description>
          {{description}}
        </mat-panel-description>
      </mat-expansion-panel-header>
    </mat-expansion-panel>
  `,
})
export class TypePreviewComponent {
  @Input() type: Type;

  get id() {
    return this.type.id;
  }

  get name() {
       return this.type.name;
  }

  get description() {
    return this.type.description;
  }
}
