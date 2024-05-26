import { Routes } from '@angular/router';
import { StorageService } from './services/common/StorageService';
import { AppStateService } from './services/common/appStateService';
import { AuthService } from './services/auth.service';
import { authenticationGuard } from './services/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.routes').then((m) => m.routes),
    canActivate: [authenticationGuard()]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    providers: [AppStateService,AuthService]
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage),
    providers: [AppStateService,AuthService]
  },
  {
    path: 'tutorial',
    loadComponent: () => import('./pages/tutorial/tutorial.page').then( m => m.TutorialPage)
  }
];
