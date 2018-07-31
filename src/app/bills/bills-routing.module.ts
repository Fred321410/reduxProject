import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionPageComponent } from './containers/collection-page';
import { BillAddComponent } from './components/bill-add';

export const routes: Routes = [
  { path: '', component: CollectionPageComponent,
  children: [
    { path: 'add', component: BillAddComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsRoutingModule {}
