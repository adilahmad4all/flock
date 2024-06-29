import * as path from "path";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { StoriesController } from "./stories.controller";
import {
  CommentRepository,
  DbOrmService,
  UserRepository,
  CommentService,
  UserService,
  StoriesService,
  StoriesRepository,
} from "repositories";

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(
        process.cwd(),
        "config/env",
        !ENV ? ".env.local" : `.env.${ENV}`
      ),
      isGlobal: true,
    }),
  ],
  controllers: [StoriesController],
  providers: [
    DbOrmService,
    UserService,
    UserRepository,
    StoriesService,
    StoriesRepository,
    CommentService,
    CommentRepository,
  ],
})
export class StoriesModule {}
