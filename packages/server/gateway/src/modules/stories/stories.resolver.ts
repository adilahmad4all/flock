import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLAuthGuard } from "../../services/jwt/jwt-auth.guard";

import {
  Comment,
  StoriesCreateOutputResponse,
  StoriesCreateInput,
  StoriesUpdateInput,
  StoriesArrayResponse,
  StoriesByUsernameInput,
  StoriesByIdInput,
  StoriesSingleOutputResponse,
} from "repositories";

import { StoriesService } from "./stories.service";

@Resolver()
export class StoriesResolver {
  constructor(private readonly storiesService: StoriesService) {}

  @Mutation(() => StoriesCreateOutputResponse)
  @UseGuards(GraphQLAuthGuard)
  createStories(@Args("stories") stories: StoriesCreateInput) {
    return this.storiesService.create(stories);
  }

  @Mutation(() => StoriesCreateOutputResponse)
  @UseGuards(GraphQLAuthGuard)
  updateStories(@Args("stories") stories: StoriesUpdateInput) {
    return this.storiesService.update(stories);
  }

  @Query(() => StoriesArrayResponse)
  @UseGuards(GraphQLAuthGuard)
  getAllStoriess(@Context() context: any) {
    return this.storiesService.getByUsername(context.req.user.username);
  }

  @Query(() => StoriesArrayResponse)
  @UseGuards(GraphQLAuthGuard)
  getStoriessByUsername(@Args("payload") payload: StoriesByUsernameInput) {
    return this.storiesService.getByUsername(payload.username);
  }

  @Query(() => StoriesSingleOutputResponse)
  @UseGuards(GraphQLAuthGuard)
  getStoriesByID(@Args("payload") payload: StoriesByIdInput) {
    return this.storiesService.getByID(payload);
  }

  @Mutation(() => String)
  @UseGuards(GraphQLAuthGuard)
  deleteStories(@Args("payload") payload: StoriesByIdInput) {
    return this.storiesService.deleteStories(payload.id);
  }

  // Comment APIs

  // @Mutation(() => Comment)
  // @UseGuards(GraphQLAuthGuard)
  // createComment(@Args("comment") comment: CreateCommentInput) {
  //   return this.storiesService.createComment(comment);
  // }

  // @Query(() => [Comment])
  // @UseGuards(GraphQLAuthGuard)
  // getCommentsByStories(@Args("payload") payload: GetCommentByStoriesInput) {
  //   return this.storiesService.getCommentsByStories(payload);
  // }

  // @Mutation(() => String)
  // @UseGuards(GraphQLAuthGuard)
  // deleteComment(@Args("payload") payload: DeleteCommentInput) {
  //   return this.storiesService.deleteComment(payload);
  // }

  // Tag APIs
}
