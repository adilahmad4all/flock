
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import * as path from "path";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { AuthModule } from "../modules/auth/auth.module";
import { ProfileModule } from "../modules/profile/profile.module";
import { ArticleModule } from "../modules/article/article.module";

import { LoggingPlugin } from "../shared/plugins/logging";
import { ConfigModule } from "@nestjs/config";

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(
        process.cwd(),
        "config/env",
        !ENV ? ".env" : `.env.${ENV}`
      ),
      isGlobal: true,
    }),
    AuthModule,
    ProfileModule,
    ArticleModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,

      include: [AuthModule, ProfileModule, ArticleModule],
      context: ({ req }) => ({
        cors: {
          origin: "*",
          credentials: false,
        },
      }),
    }),
  ],

  controllers: [AppController],
  providers: [AppService, LoggingPlugin],
})
export class AppModule {}
function ApolloServerOperationRegistry(arg0: {}) {
  throw new Error("Function not implemented.");
}
