import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { CommentService, StoriesService } from "repositories";
@Controller()
export class StoriesController {
  constructor(
    private readonly storiesService: StoriesService,
    private readonly commentService: CommentService
  ) {}

  @MessagePattern("create_story")
  handleCreateStory(story) {
    return this.storiesService.createStory(story);
  }

  @MessagePattern("update_story")
  handleUpdateStory(story) {
    return this.storiesService.updateStory(story);
  }

  @MessagePattern("get_all_stories")
  handleGetAllStories(currentUser) {
    return this.storiesService.getAll(currentUser);
  }

  @MessagePattern("get_stories_by_author")
  handleGetArticlesByAuthor(payload) {
    return this.storiesService.getByID(payload.author, payload.currentUser);
  }

  @MessagePattern("get_stories_by_id")
  handleGetArticleByID(payload) {
    return this.storiesService.getByID(payload.articleID, payload.currentUser);
  }
  @MessagePattern("delete_story")
  handleDeleteArticle(payload) {
    return this.storiesService.deleteStory(payload.id, payload.title);
  }

  // comments
  // @MessagePattern("create_comment")
  // handleCreateComment(comment) {
  //   return this.commentService.createComment(comment);
  // }

  // @MessagePattern("get_comments_by_story")
  // handleGetCommentsByArticle(payload) {
  //   return this.commentService.getCommentsByStory(payload);
  // }

  // @MessagePattern("delete_comment")
  // handleDeleteComments(id) {
  //   return this.commentService.deleteComment(id);
  // }
}
