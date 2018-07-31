import { Component, HostBinding} from '@angular/core';
import {slideInOutAnimation } from '../../shared/animations';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'rp-bill-add',
  animations: [slideInOutAnimation],
  styleUrls: ['./bill-add.scss'],
  template: `
  <div class="side-form">
  <h1>Add</h1>
  <a class="btn btn-default" routerLink="/">Cancel</a>
</div>
  `,
})
export class BillAddComponent {
    @HostBinding('@slideInOutAnimation')
    public slideInOutAnimation = true;

    constructor(private route: ActivatedRoute, private router: Router) { }

    saveProduct() {
        console.log('COucou');
    }
}
