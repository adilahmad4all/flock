import { CassandraService } from '@ithub/cassandra-service';
import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import {
  CommentRepository,
  FavoriteRepository,
  FeedRepository,
  TagRepository,
  UserRepository,
  CommentService,
  FavoriteService,
  FeedService,
  TagService,
  UserService,
  FollowerService,
  FollowerRepository
} from 'repositories';

@Module({
  controllers: [FeedController],
  providers: [
    FeedService,
    FeedRepository,
    TagService,
    TagRepository,
    CassandraService,
    UserService,
    UserRepository,
    FavoriteRepository,
    FavoriteService,
    CommentService,
    CommentRepository,
    FollowerService,
    FollowerRepository
  ],
})
export class FeedModule { }
