import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from '../modules/auth/auth.module';
import { ProfileModule } from '../modules/profile/profile.module';
import { ArticleModule } from '../modules/article/article.module';

import {LoggingPlugin} from '../shared/plugins/logging'

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    ArticleModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
     
      include: [
        AuthModule,
        ProfileModule,
        ArticleModule
      ],
      context: ({ req }) => ({
              cors: {
                origin: '*',
                credentials: false
              }
            })
     
    })
  ],
  controllers: [AppController],
  providers: [AppService, LoggingPlugin],
})
export class AppModule { }
function ApolloServerOperationRegistry(arg0: {}) {
  throw new Error('Function not implemented.');
}

