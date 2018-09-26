import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionPageComponent } from './containers/collection-page';
import {TypeAddPageComponent} from './containers/type-add-page';

export const routes: Routes = [
  { path: '', component: CollectionPageComponent,
  children: [
    { path: 'add', component: TypeAddPageComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypesRoutingModule {}
