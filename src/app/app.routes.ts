
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title:'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
   
  },
  {
    path: 'admin',
    title:'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate:[AuthGuard]
  }
];
