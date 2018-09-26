import {Component, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Localisation} from '../models/localisation';

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
            <input matInput type="text" placeholder="Dénomination du lieu" formControlName="name">
          </mat-form-field>
        </div>
        <div class="example-container">
          <mat-form-field>
            <input matInput type="text" placeholder="Description du lieu" formControlName="description">
          </mat-form-field>
        </div>
        <button type="button" mat-raised-button (click)="cancel()"><mat-icon>arrow_back</mat-icon>Cancel</button>
        <button style="float: right" color="primary" type="submit" mat-raised-button>Valider</button>
      </form>
    </div>
  `,
})
export class LocalisationAddComponent {
  @Output() submitted = new EventEmitter<Localisation>();
  @Output() cancelEvent = new EventEmitter<any>();

  constructor() { }

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

  cancel() {
    this.cancelEvent.emit();
  }
}
