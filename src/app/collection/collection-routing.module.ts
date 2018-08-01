import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionPageComponent } from './containers/collection-page';

export const routes: Routes = [
  { path: '', component: CollectionPageComponent,
  children: [
    { path: 'bills', loadChildren: '../bills/bills.module#BillsModule'},
    { path: 'localisations', loadChildren: '../localisations/localisations.module#LocalisationsModule'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionRoutingModule {}
