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

import { InMemoryCache } from '@apollo/client/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
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
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://48p1r2roz4.sse.codesandbox.io',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ],
})
export class AppModule {}
