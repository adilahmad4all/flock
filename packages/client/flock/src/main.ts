import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { graphqlProvider } from './app/graphql.provider';

import { Storage} from "@ionic/storage-angular";
import { StorageService } from './app/services/common/StorageService';
import { AppStateService } from './app/services/common/appStateService';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [ Storage,StorageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(),
    graphqlProvider,
    
  ],
});
