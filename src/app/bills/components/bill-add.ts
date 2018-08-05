import { Component, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Bill } from '../models/bill';

@Component({
  selector: 'rp-bill-add',
  styleUrls: ['./bill-add.scss'],
  template: `
  <div class="side-form">
  <section class="mat-typography">
    <h1>Ajout d'une facture</h1>
  </section>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="example-container">
        <mat-form-field>
          <input matInput [matDatepicker]="myDatepicker" placeholder="Date de la facture" formControlName="date">
          <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
          <mat-datepicker #myDatepicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field>
          <input matInput type="number" placeholder="Montant de la facture" formControlName="amount">
          <mat-icon matSuffix>€</mat-icon>
        </mat-form-field>
      </div>
      <button type="button" mat-raised-button (click)="cancel()"><mat-icon>arrow_back</mat-icon>Cancel</button>
      <button style="float: right" color="primary" type="submit" mat-raised-button>Valider</button>
    </form>
  </div>
  `,
})
export class BillAddComponent {

    @Output() submitted = new EventEmitter<Bill>();
    @Output() cancelEvent = new EventEmitter<any>();

    constructor() { }

    form: FormGroup = new FormGroup({
      date: new FormControl(''),
      amount: new FormControl(''),
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
