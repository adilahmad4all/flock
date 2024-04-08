import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { AuthModule } from './modules/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { createApollo } from './shared/apollo/createApollo';
import { SettingsModule } from './modules/settings/settings.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ArticleModule } from './modules/article/article.module';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { provideIonicAngular, IonicRouteStrategy } from '@ionic/angular/standalone';

@NgModule({
  declarations: [
    AppComponent,
   
    FooterComponent
  ],
  imports: [
    HeaderComponent,
    AuthModule,
    SettingsModule,
    ProfileModule,
    ArticleModule,
    BrowserModule,
    ApolloModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      useHash: true,
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'ios' }),
    provideRouter(appRoutes),

    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ],
})
export class AppModule {}
