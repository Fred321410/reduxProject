import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionPageComponent } from './containers/collection-page';
import { BIllAddPageComponent } from './containers/bill-add-page';

export const routes: Routes = [
  { path: '', component: CollectionPageComponent,
  children: [
    { path: 'add', component: BIllAddPageComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsRoutingModule {}
