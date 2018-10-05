import { Component, Input } from '@angular/core';
import { Localisation } from '../models/localisation';

@Component({
  selector: 'rp-localisation-preview',
  template: `
    <a>
      <mat-card>
        <mat-card-title-group>
          <mat-card-title>{{ name | bcEllipsis:35 }}</mat-card-title>
        </mat-card-title-group>
        <mat-card-content>
          <p *ngIf="description">{{ description | bcEllipsis }}</p>
          <br/>
          <mat-chip-list>
            <mat-chip *ngFor="let type of types" selected color="primary">{{type.name}}</mat-chip>
          </mat-chip-list>
        </mat-card-content>
      </mat-card>
    </a>
  `,
  styles: [
    `
    mat-card {
      width: 300px;
      margin: 15px;

      justify-content: space-between;
    }

    @media only screen and (max-width: 768px) {
      mat-card {
        margin: 15px 0 !important;
      }
    }
    mat-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    mat-card-title {
      margin-right: 10px;
    }
    mat-card-title-group {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    mat-card-content {
      margin-top: 15px;
      margin: 15px 0 0;
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    mat-card-footer {
      padding: 0 25px 25px;
    }
  `,
  ],
})
export class LocalisationPreviewComponent {
  @Input() localisation: Localisation;

  get id() {
    return this.localisation.id;
  }

  get name() {
       return this.localisation.name;
  }

  get description() {
    return this.localisation.description;
  }

  get types() {
    return this.localisation.types;
  }
}
