import { Routes } from '@angular/router';
import { CoreComponent } from './core.component';

import {CommunitiesPage} from './communities/communities.page'
export const routes: Routes = [
  {
    path: 'core',
    component: CoreComponent,
    children: [
      {
        path: 'explore',
        loadComponent: () =>
          import('./explore/explore.page').then((m) => m.ExplorePage),
      },
      {
        path: 'sink',
        loadComponent: () =>
          import('./sink/sink.page').then((m) => m.SinkPage),
      },
      
      {
        path: 'communities',
        loadComponent: () =>
          import('./communities/communities.page').then((m) => m.CommunitiesPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./messages/messages.page').then((m) => m.MessagesPage),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/core/explore',
    pathMatch: 'full',
  },
];
