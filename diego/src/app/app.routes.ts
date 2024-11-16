import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard'; 

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./page/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./shared/components/update-profile/update-profile.component').then(m => m.UpdateProfileComponent)
  },
  {
    path: '**',
    redirectTo: '/home'
  },

  {
    path: 'profile',
    loadComponent: () => import('./shared/components/update-profile/update-profile.component')
      .then(m => m.UpdateProfileComponent),
    canActivate: [authGuard]
  }
];
