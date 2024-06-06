import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from "@nestjs/common";
import { ClientKafka, RpcException } from "@nestjs/microservices";
import { map } from "rxjs";
import { UpdateStoriesInput,CreateStoriesInput } from "repositories";


const logger = new Logger();
@Injectable()
export class StoriesService implements OnModuleInit {
  constructor(
    @Inject("ARTICLE-SERVICE") private readonly storiesClient: ClientKafka
  ) {}

  onModuleInit() {
    this.storiesClient.subscribeToResponseOf("create_stories");
    this.storiesClient.subscribeToResponseOf("update_stories");
    this.storiesClient.subscribeToResponseOf("get_all_storiess");
    this.storiesClient.subscribeToResponseOf("get_stories_by_owner");
    this.storiesClient.subscribeToResponseOf("delete_stories");
    this.storiesClient.subscribeToResponseOf("get_stories_by_id");
    this.storiesClient.subscribeToResponseOf("create_comment");
    this.storiesClient.subscribeToResponseOf("get_comments_by_stories");
    this.storiesClient.subscribeToResponseOf("delete_comment");

  }

  create(stories: CreateStoriesInput) {
    logger.log("GATEWAY - Calling Stories Service");

    return this.storiesClient.send("create_stories", stories).pipe(
      map((newStories) => {
        if (!newStories) {
          logger.log("GATEWAY - Stories creation failed");

          throw new BadRequestException("Title already exists");
        }

        logger.log("GATEWAY - Stories created successfully");
        return newStories;
      })
    );
  }

  update(stories: UpdateStoriesInput) {
    logger.log("GATEWAY - Calling Stories Service");

    return this.storiesClient.send("update_stories", stories).pipe(
      map((updatedStories) => {
        if (!updatedStories) {
          logger.log("GATEWAY - Stories not found");

          return new RpcException("Stories not found");
        }

        logger.log("GATEWAY - Stories updated successfully");
        return updatedStories;
      })
    );
  }

  getAll(currentUser: string) {
    logger.log("GATEWAY - Calling Stories Service");

    return this.storiesClient.send("get_all_storiess", currentUser).pipe(
      map((storiess) => {
        logger.log("GATEWAY - Storiess retrieved");

        return storiess;
      })
    );
  }

  getByAuthor(author: string, currentUser: string) {
    logger.log("GATEWAY - Calling Stories Service");

    return this.storiesClient
      .send("get_storiess_by_author", { author, currentUser })
      .pipe(map((storiess) => storiess));
  }

  /**
   *
   * @param payload : {
   *  storiesID
   *  currentUser
   *  token
   * }
   */
  getByID(payload) {
    logger.log("GATEWAY - Calling Stories Service");

    return this.storiesClient.send("get_stories_by_id", payload);
  }

  getByTag(payload) {
    logger.log("GATEWAY - Calling Stories Service");

    return this.storiesClient.send("get_storiess_by_tag", payload).pipe(
      map((storiess) => {
        logger.log("GATEWAY - Stories by tag retrieved");

        return storiess;
      })
    );
  }

  getUserFavorited(payload) {
    logger.log("GATEWAY - Calling Stories Service");

    return this.storiesClient.send("get_favorited_storiess", payload).pipe(
      map((storiess) => {
        logger.log("GATEWAY - Favorited storiess retrieved");

        return storiess;
      })
    );
  }

  favoriteStories(favoriteArgs) {
    logger.log("GATEWAY - Calling Stories Service Favorite Method");

    return this.storiesClient.send("favorite_stories", favoriteArgs);
  }

  unfavoriteStories(unfavoriteArgs) {
    logger.log("GATEWAY - Calling Stories Service Unfavorite Method");

    return this.storiesClient.send("unfavorite_stories", unfavoriteArgs);
  }

  deleteStories(payload) {
    logger.log("GATEWAY - Calling Stories Service Delete Method");

    return this.storiesClient.send("delete_stories", payload);
  }

  // Comment Services

  createComment(comment) {
    logger.log("GATEWAY - Calling Stories Service");

    return this.storiesClient.send("create_comment", comment);
  }

  getCommentsByStories(payload) {
    logger.log("GATEWAY - Calling Stories Service");

    return this.storiesClient
      .send("get_comments_by_stories", payload)
      .pipe(map((comments) => comments));
  }

  deleteComment(payload) {
    logger.log("GATEWAY - Calling Stories Service");

    return this.storiesClient.send("delete_comment", payload.id);
  }

  // Tag Services

  getPopularTags(payload) {
    logger.log("GATEWAY - Calling Stories Service");

    return this.storiesClient.send("popular_tags", payload).pipe(
      map((tags) => {
        logger.log("GATEWAY - Popular Tags retrieved");

        return tags;
      })
    );
  }
}
