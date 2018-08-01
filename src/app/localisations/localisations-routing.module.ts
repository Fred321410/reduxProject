import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionPageComponent } from './containers/collection-page';
import { LocalisationAddComponent } from './components/localisation-add';

export const routes: Routes = [
  { path: '', component: CollectionPageComponent,
  children: [
    { path: 'add', component: LocalisationAddComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalisationsRoutingModule {}
