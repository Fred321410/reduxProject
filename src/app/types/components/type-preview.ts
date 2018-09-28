import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Type} from '../models/type';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
declare var _: any;

@Component({
  selector: 'rp-type-preview',
  template: `
    <mat-expansion-panel [expanded]="expendedPanel && type.id === expendedPanel.id">
      <mat-expansion-panel-header (click)="openPanel()">
        <mat-panel-title>
          {{name}}
        </mat-panel-title>
        <mat-panel-description>
          {{description}}
        </mat-panel-description>
      </mat-expansion-panel-header>
      <mat-form-field class="chip-list">
        <mat-chip-list #chipList>
          <mat-chip *ngFor="let ssType of type.sousType" [selectable]="selectable"
                    [removable]="removable" (removed)="remove(ssType)">
            {{ssType}}
            <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
          </mat-chip>
          <input placeholder="Nouveau sous-type..."
                 [matChipInputFor]="chipList"
                 [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                 [matChipInputAddOnBlur]="addOnBlur"
                 (matChipInputTokenEnd)="add($event)">
        </mat-chip-list>
      </mat-form-field>
    </mat-expansion-panel>
  `,
  styles: [
    `
      .chip-list {
        width: 100%;
      }
    `
  ]
})
export class TypePreviewComponent {
  @Input() type: Type;
  @Input() expendedPanel: Type;
  @Output() expendPanel = new EventEmitter<Type>();
  @Output() addSousType = new EventEmitter<{sousType: string, type: Type}>();
  @Output() removeSousType = new EventEmitter<{sousType: string, type: Type}>();
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && !_.find(this.type.sousType, function(ssType) { return ssType === value.trim().toUpperCase(); })) {
      this.addSousType.emit({sousType: value.trim().toUpperCase(), type: this.type});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(ssType: string): void {
    const index = this.type.sousType.indexOf(ssType);

    if (index >= 0) {
      this.removeSousType.emit({sousType: ssType.trim(), type: this.type});
    }
  }

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
    this.expendPanel.emit(this.expendedPanel && this.expendedPanel.id === this.type.id ? null : this.type);
  }
}
