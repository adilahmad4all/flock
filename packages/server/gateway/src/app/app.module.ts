import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import * as path from "path";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { AuthModule } from "../modules/user/auth.module";
import { ProfileModule } from "../modules/profile/profile.module";
import { StoriesModule } from "../modules/stories/stories.module";

import { LoggingPlugin } from "../services/plugins/logging";
import { ConfigModule } from "@nestjs/config";
import { MinioService } from "src/services/minio.service";

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
    StoriesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,

      include: [AuthModule, ProfileModule, StoriesModule],
      context: ({ req }) => ({
        cors: {
          origin: "*",
          credentials: false,
        },
      }),
    }),
  ],

  controllers: [AppController],
  providers: [AppService, LoggingPlugin, MinioService],
})
export class AppModule {}
function ApolloServerOperationRegistry(arg0: {}) {
  throw new Error("Function not implemented.");
}
