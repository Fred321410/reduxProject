import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Type} from '../models/type';

@Component({
  selector: 'rp-type-preview',
  template: `
    <mat-expansion-panel (opened)="openPanel()">
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
  @Output() expendPanel = new EventEmitter<Type>();

  get id() {
    return this.type.id;
  }

  get name() {
       return this.type.name;
  }

  get description() {
    return this.type.description;
  }

  openPanel() {
    this.expendPanel.emit(this.type);
  }
}
