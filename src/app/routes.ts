import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.services';
import { NotFoundPageComponent } from './core/containers/not-found-page';

export const routes: Routes = [
  { path: '', redirectTo: '/bills', pathMatch: 'full' },
  {
    path: 'bills',
    loadChildren: './bills/bills.module#BillsModule',
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];
