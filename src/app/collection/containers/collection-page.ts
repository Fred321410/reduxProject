import {Component, ChangeDetectionStrategy} from '@angular/core';
import {slideRightLeftAnimation} from '../../shared/animations';

@Component({
  selector: 'rp-collection-page',
  animations: [ slideRightLeftAnimation ],
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
        [active]="rla.isActive" (click)="activeNavLinkIndex = link.index">
        {{link.label}}
      </a>
    </nav>
    <div [@slideRightLeftAnimation]="collection.isActivated ? activeNavLinkIndex : 0">
      <router-outlet #collection="outlet"></router-outlet>
    </div>
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
      path: 'bills',
      index: 1
    },
    {
      label: 'Localisations',
      path: 'localisations',
      index: 2
    }
  ];
  activeNavLinkIndex = 0;

  constructor() {
  }
}
