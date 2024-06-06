import { Module } from "@nestjs/common";
import { FeedController } from "./stories.controller";
import {
  CommentRepository,
  DbOrmService,
  UserRepository,
  CommentService,
  UserService,
} from "repositories";

@Module({
  controllers: [FeedController],
  providers: [
    DbOrmService,
    UserService,
    UserRepository,
    CommentService,
    CommentRepository,
  ],
})
export class FeedModule {}
