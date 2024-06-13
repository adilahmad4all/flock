import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLAuthGuard } from "../../services/jwt/jwt-auth.guard";

import {
  Comment,
  Stories,
  CreateStoriesInput,
  CreateCommentInput,
  DeleteCommentInput,
  DeleteStoriesInput,
  GetAllStoriessInput,
  GetStoriesByIdInput,
  GetOwnerStoriesInput,
  GetCommentByStoriesInput,
  UpdateStoriesInput,
} from "repositories";

import { StoriesService } from "./stories.service";

@Resolver()
export class StoriesResolver {
  constructor(private readonly storiesService: StoriesService) {}

  @Mutation(() => Stories)
  @UseGuards(GraphQLAuthGuard)
  createStories(@Args("stories") stories: CreateStoriesInput) {
    return this.storiesService.create(stories);
  }

  @Mutation(() => Stories)
  @UseGuards(GraphQLAuthGuard)
  updateStories(@Args("stories") stories: UpdateStoriesInput) {
    return this.storiesService.update(stories);
  }

  @Query(() => [Stories])
  @UseGuards(GraphQLAuthGuard)
  getAllStoriess(@Args("payload") payload: GetAllStoriessInput) {
    return this.storiesService.getAll(payload.currentUser);
  }

  @Query(() => [Stories])
  @UseGuards(GraphQLAuthGuard)
  getStoriessByAuthor(@Args("payload") payload: GetOwnerStoriesInput) {
    return this.storiesService.getByAuthor(payload.author, payload.currentUser);
  }

  @Query(() => Stories)
  @UseGuards(GraphQLAuthGuard)
  getStoriesByID(@Args("payload") payload: GetStoriesByIdInput) {
    return this.storiesService.getByID(payload);
  }

  @Mutation(() => String)
  @UseGuards(GraphQLAuthGuard)
  deleteStories(@Args("payload") payload: DeleteStoriesInput) {
    return this.storiesService.deleteStories(payload);
  }

  // Comment APIs

  @Mutation(() => Comment)
  @UseGuards(GraphQLAuthGuard)
  createComment(@Args("comment") comment: CreateCommentInput) {
    return this.storiesService.createComment(comment);
  }

  @Query(() => [Comment])
  @UseGuards(GraphQLAuthGuard)
  getCommentsByStories(@Args("payload") payload: GetCommentByStoriesInput) {
    return this.storiesService.getCommentsByStories(payload);
  }

  @Mutation(() => String)
  @UseGuards(GraphQLAuthGuard)
  deleteComment(@Args("payload") payload: DeleteCommentInput) {
    return this.storiesService.deleteComment(payload);
  }

  // Tag APIs
}
