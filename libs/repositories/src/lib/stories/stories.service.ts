import { Injectable, Logger } from "@nestjs/common";
import { randomUUID } from "crypto";
import { UserService } from "../user/user.service";
import { FollowerService } from "../profile/services/follower.service";
import { StoriesRepository } from "./repos/stories.repository";

const logger = new Logger();
@Injectable()
export class StoriesService {
  constructor(
    private readonly StoriesRepository: StoriesRepository,

    private readonly userService: UserService,

    private readonly followerService: FollowerService
  ) {}

  async createStory(story) {
    logger.log("STORIES-SERVICE: Create STORIES triggered");
    await this.StoriesRepository.create(story);
    logger.log("STORIES-SERVICE: STORIES created");
  }

  async updateStory(story) {
    logger.log("STORIES-SERVICE: Update STORIES triggered");
    const article_exists: any = await this.StoriesRepository.getByID(story.id);

    if (article_exists) {
      story.created_at = article_exists.createdAt;
      story.author = article_exists.author;

      await this.StoriesRepository.updateArticle(story);

      const updated = await this.StoriesRepository.getByID(story.id);

      return updated;
    }

    return;
  }

  async getAll(currentUser) {
    logger.log("ARTICLE-SERVICE: Get all article triggered");

    const stories = await this.StoriesRepository.getAll();
    const users = await this.userService.getAll();

    // const updated_articles = articles.map((article) => {
    //   const user = users.find(_user => _user.email === article.author);
    // )};

    return stories;
  }

  async getByAuthor(owner, currentUser) {
    logger.log("ARTICLE-SERVICE: Get articles by author triggered");

    const user = await this.userService.getUserByUsername(owner);
    if (user?.data?.id){
      const stories = await this.StoriesRepository.getByOwner(user.data.id);
  
    const updated_stories = stories.map((article) => {
      return {
        ...stories,
        createdAt: stories.created_at,
        updatedAt: stories.updated_at,

        // author: {
        //   username: user.username,
        //   email: user.email,
        //   bio: user.bio,
        //   image: user.image,
        // },
      };
    });
  }
  }

  async getByID(id, currentUser) {
    logger.log("STORIES-SERVICE: Get story by ID triggered");

    const stories = await this.StoriesRepository.getByID(id);

    return stories;
  }

  async deleteStory(id, title) {
    return this.StoriesRepository.delete(id, title);
  }
}
