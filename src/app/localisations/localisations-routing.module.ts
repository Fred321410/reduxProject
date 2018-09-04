import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionPageComponent } from './containers/collection-page';
import {LocalisationAddPageComponent} from './containers/localisation-add-page';

export const routes: Routes = [
  { path: '', component: CollectionPageComponent,
  children: [
    { path: 'add', component: LocalisationAddPageComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalisationsRoutingModule {}
