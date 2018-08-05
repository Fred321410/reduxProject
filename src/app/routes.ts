import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.services';
import { NotFoundPageComponent } from './core/containers/not-found-page';

export const routes: Routes = [
  { path: '', redirectTo: '/collection/bills', pathMatch: 'full' },
  {
    path: 'collection',
    loadChildren: './collection/collection.module#CollectionModule',
    // canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];
