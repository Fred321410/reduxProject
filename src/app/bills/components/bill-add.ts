import {Component, Output, EventEmitter, Input} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Bill } from '../models/bill';
import {Localisation} from '../../localisations/models/localisation';

@Component({
  selector: 'rp-bill-add',
  styleUrls: ['./bill-add.scss'],
  template: `
  <div class="side-form">
  <section class="mat-typography">
    <h1>Ajout d'une facture</h1>
  </section>
    <form [formGroup]="form" (ngSubmit)="submit()" autocomplete="off">
      <div class="example-container">
        <mat-form-field>
          <input matInput [matDatepicker]="myDatepicker" placeholder="Date de la facture"
                 formControlName="date" (focus)="myDatepicker.open()" (click)="myDatepicker.open()" >
          <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
          <mat-datepicker #myDatepicker></mat-datepicker>
          <mat-error>
            La date est obligatoire
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <input id="amount" matInput type="number" placeholder="Montant de la facture" formControlName="amount" min="0">
          <mat-icon matSuffix>€</mat-icon>
          <mat-error *ngIf="form.get('amount').errors && form.get('amount').errors['required']">
            Le montant est obligatoire
          </mat-error>
          <mat-error *ngIf="form.get('amount').errors && form.get('amount').errors['min']">
            Le montant doit être positif
          </mat-error>
        </mat-form-field>

        <mat-radio-group formControlName="isDebit" style="padding: 20px; padding-left: 0px">
          <mat-radio-button [checked]="true" value="true" style="margin-right: 5px">
            Débit
          </mat-radio-button>
          <mat-radio-button value="false">
            Crédit
          </mat-radio-button>
        </mat-radio-group>

        <mat-form-field>
          <mat-select placeholder="Localisation" [compareWith]="compareByOptionId"
                      formControlName="localisation" (selectionChange)="selectLocalisation($event.value)">
            <mat-option>None</mat-option>
            <mat-option *ngFor="let localisation of localisations" [value]="localisation">{{localisation.name}}{{localisation.city && localisation.city !== '' ? ' - ' + localisation.city : ''}}</mat-option>
          </mat-select>
          <mat-error>
            La localisation est obligatoire
          </mat-error>
        </mat-form-field>
        <mat-form-field>
          <div class="emptyDiv" *ngIf="sousTypes.length === 0">
          </div>
          <mat-chip-list #chips [disabled]="sousTypes.length === 0" [multiple]="true" [selectable]="true" placeholder="Type">
            <mat-chip *ngFor="let sousType of sousTypes" [selected]="sousType.selected" color="primary"
                      (click)="sousType.selected = !sousType.selected">{{sousType.name}}</mat-chip>
          </mat-chip-list>
        </mat-form-field>
        <mat-form-field>
          <mat-select placeholder="Type de paiement" formControlName="prelevementType">
            <mat-option>None</mat-option>
            <mat-option *ngFor="let prelevementType of prelevementTypes" [value]="prelevementType">{{prelevementType}}</mat-option>
          </mat-select>
          <mat-error>
            Le type de paiement est obligatoire
          </mat-error>
        </mat-form-field>
        <mat-form-field>
          <textarea matInput  formControlName="description" placeholder="Description"></textarea>
        </mat-form-field>
      </div>
      <button type="button" mat-raised-button (click)="cancel()"><mat-icon>arrow_back</mat-icon>Cancel</button>
      <button style="float: right" color="primary" type="submit" mat-raised-button>Valider</button>
    </form>
  </div>
  `,
})
export class BillAddComponent {

  @Input() localisations: Localisation[];
  @Input() prelevementTypes: string[];
  @Input() bills: Bill[];
  private _billId: string;
  @Output() submitted = new EventEmitter<Bill>();
  @Output() cancelEvent = new EventEmitter<any>();

  get billId(): string {
    return this._billId;
  }

  @Input()
  set billId(billId: string) {
    this._billId = billId;
    const billToUpdate = this.bills.find(function(bill) {
      return bill.id === billId;
    });
    if (billToUpdate) {
      this.form.get('date').setValue(new Date(billToUpdate.date));
      this.form.get('amount').setValue(billToUpdate.amount);
      this.form.get('isDebit').setValue(billToUpdate.isDebit);
      this.form.get('prelevementType').setValue(billToUpdate.prelevementType);
      this.form.get('description').setValue(billToUpdate.description);
      this.form.get('localisation').setValue(billToUpdate.localisation);
      this.selectLocalisation(billToUpdate.localisation);
      this.sousTypes.forEach(function(sousType) {
        if (billToUpdate.types.indexOf(sousType.name) >= 0) {
          sousType.selected = true;
        }
      }.bind(this));
      this.form.get('types').setValue(this.sousTypes);
    }
  }

  sousTypes: {name: string, selected: boolean}[] = [];

  constructor() { }

  form: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(0)]),
    isDebit: new FormControl(true, [Validators.required]),
    localisation: new FormControl('', [Validators.required]),
    prelevementType: new FormControl('', [Validators.required]),
    types: new FormControl(''),
    description: new FormControl('')
  });

  compareByOptionId(option1, option2) {
    return option1.id && option2.id && option1.id === option2.id;
  }

  submit() {
    if (this.form.valid) {
      this.form.value.types = this.sousTypes.filter(function (sousType) { return sousType.selected; })
        .map(function (sousType) { return sousType.name; });
      this.submitted.emit(this.form.value);
    }
  }

  cancel() {
    this.cancelEvent.emit();
  }

  selectLocalisation(localisationSelected: Localisation) {
    this.sousTypes = [];
    if (localisationSelected) {
      localisationSelected.types.forEach(function(type) {
        type.sousType.forEach(function(nameSousType) {
          this.sousTypes.push({name: nameSousType, selected: false});
        }.bind(this));
      }.bind(this));
    }
  }
}
