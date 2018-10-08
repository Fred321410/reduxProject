import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Localisation} from '../models/localisation';
import {Type} from '../../types/models/type';

@Component({
  selector: 'rp-localisation-add',
  styleUrls: ['./localisation-add.scss'],
  template: `
    <div class="side-form">
      <section class="mat-typography">
        <h1>Ajout d'une localisation</h1>
      </section>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="example-container">
          <mat-form-field>
            <input matInput type="text" placeholder="Dénomination du lieu"
                   formControlName="name" name="name">
          </mat-form-field>
        </div>
        <div class="example-container">
          <mat-form-field>
            <input matInput type="text" placeholder="Description du lieu" formControlName="description">
          </mat-form-field>
        </div>
        <div class="example-container">
          <mat-form-field>
            <div class="emptyDiv" *ngIf="selectedTypes.length === 0">
            </div>
            <mat-chip-list #chips [multiple]="true" [selectable]="true" placeholder="Type">
              <mat-chip *ngFor="let type of selectedTypes" (click)="removeType(type)">{{type.name}}</mat-chip>
            </mat-chip-list>
          </mat-form-field>
          <div *ngIf="possibleTypes.length > 0">
            <mat-chip-list #chips [multiple]="true" [selectable]="true">
              <mat-chip *ngFor="let type of possibleTypes" (click)="addType(type)">{{type.name}}</mat-chip>
            </mat-chip-list>
          </div>
        </div>
        <br/>
        <button type="button" mat-raised-button (click)="cancel()"><mat-icon>arrow_back</mat-icon>Cancel</button>
        <button style="float: right" color="primary" type="submit" mat-raised-button>Valider</button>
      </form>
    </div>
  `,
})
export class LocalisationAddComponent {
  @Output() submitted = new EventEmitter<Localisation>();
  @Output() cancelEvent = new EventEmitter<any>();
  @Input() localisations: Localisation[];
  private _localisationId: string;
  private _types: Type[];

  get types(): Type[] {
    return this._types;
  }

  @Input()
  set types(types: Type[]) {
    this._types = types;
    this.possibleTypes.push(...types);
  }

  get localisationId(): string {
    return this._localisationId;
  }

  @Input()
  set localisationId(localisationId: string) {
    this._localisationId = localisationId;
    const localisationToUpdate = this.localisations.find(function(localisation) {
      return localisation.id === localisationId;
    });
    if (localisationToUpdate) {
      this.form.get('name').setValue(localisationToUpdate.name);
      this.form.get('description').setValue(localisationToUpdate.description);
      localisationToUpdate.types.forEach(function (type) {
        this.selectedTypes.push(type);
        const index = this.possibleTypes.map(function (t) { return t.id; }).indexOf(type.id);
        if (index !== -1) {
          this.possibleTypes.splice(index, 1);
        }
      }.bind(this));
    }
  }

  possibleTypes: Type[] = [];
  selectedTypes: Type[] = [];

  constructor() {}

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    types: new FormControl('')
  });

  addType(type: Type) {
    this.selectedTypes.push(type);
    const index = this.possibleTypes.indexOf(type);
    this.possibleTypes.splice(index, 1);
  }

  removeType(type: Type) {
    this.possibleTypes.push(type);
    const index = this.selectedTypes.indexOf(type);
    this.selectedTypes.splice(index, 1);
  }

  submit() {
    if (this.form.valid) {
      this.form.value.types = this.selectedTypes;
      this.submitted.emit(this.form.value);
    }
  }

  cancel() {
    this.cancelEvent.emit();
  }
}
