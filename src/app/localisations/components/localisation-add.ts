import { Component, HostBinding} from '@angular/core';
import {slideInOutAnimation } from '../../shared/animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rp-localisation-add',
  animations: [slideInOutAnimation],
  styleUrls: ['./localisation-add.scss'],
  template: `
  <div class="side-form">
  <h1>Add Localisations</h1>
  <a class="btn btn-default" routerLink="/collection/localisations">Cancel</a>
</div>
  `,
})
export class LocalisationAddComponent {
    @HostBinding('@slideInOutAnimation')
    public slideInOutAnimation = true;

    constructor(private route: ActivatedRoute, private router: Router) { }

    saveProduct() {
        console.log('COucou');
    }
}
