import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'rp-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>My Collection</mat-card-title>
    </mat-card>

    <nav mat-tab-nav-bar>
      <a mat-tab-link
        *ngFor="let link of navLinks"
        [routerLink]="link.path"
        routerLinkActive #rla="routerLinkActive"
        [active]="rla.isActive">
        {{link.label}}
      </a>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
    mat-card-title {
      display: flex;
      justify-content: center;
    }
  `,
  ],
})
export class CollectionPageComponent {

  navLinks = [
    {
      label: 'Bills',
      path: 'bills'
    },
    {
      label: 'Localisations',
      path: 'localisations'
    }
  ];

  constructor() {
  }
}
