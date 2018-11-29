import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Type} from '../models/type';

@Component({
  selector: 'rp-type-add',
  styleUrls: ['./type-add.scss'],
  template: `
    <div class="side-form">
      <section class="mat-typography">
        <h1>Ajout d'un type</h1>
      </section>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="example-container">
          <mat-form-field>
            <input matInput type="text" placeholder="Dénomination du type" formControlName="name">
            <mat-error>
              La dénomination est obligatoire
            </mat-error>
          </mat-form-field>
        </div>
        <div class="example-container">
          <mat-form-field>
            <input matInput type="text" placeholder="Description du type" formControlName="description">
          </mat-form-field>
        </div>
        <button type="button" mat-raised-button (click)="cancel()"><mat-icon>arrow_back</mat-icon>Cancel</button>
        <button style="float: right" color="primary" type="submit" mat-raised-button>Valider</button>
      </form>
    </div>
  `,
})
export class TypeAddComponent {
  @Output() submitted = new EventEmitter<Type>();
  @Output() cancelEvent = new EventEmitter<any>();

  constructor() { }

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('')
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
