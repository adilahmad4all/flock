import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CommentService,
  FeedService,
  TagService
} from '@ithub/repositories';
@Controller()
export class FeedController {

  constructor(
    private readonly tagService: TagService,
    private readonly feedService: FeedService,
    private readonly commentService: CommentService
  ) { }

  @MessagePattern('create_story')
  handleCreateStory(story) {
    return this.feedService.createArticle(story);
  }

  @MessagePattern('update_story')
  handleUpdateStory(story) {
    return this.feedService.updateArticle(story);
  }

  @MessagePattern('get_all_articles')
  handleGetAllStories(currentUser) {
    return this.feedService.getAll(currentUser);
  }

  @MessagePattern('get_articles_by_author')
  handleGetArticlesByAuthor(payload) {
    return this.feedService.getByAuthor(payload.author, payload.currentUser);
  }

  @MessagePattern('get_articles_by_tag')
  handleGetArticlesByTag(payload) {
    return this.feedService.getByTag(payload.tag, payload.currentUser);
  }

  @MessagePattern('get_article_by_id')
  handleGetArticleByID(payload) {
    return this.feedService.getByID(payload.articleID, payload.currentUser);
  }

  @MessagePattern('get_favorited_articles')
  handleGetFavoritedArticles(payload) {
    return this.feedService.getUserFavorited(payload);
  }

  @MessagePattern('favorite_article')
  handleFavoriteArticle(payload) {
    return this.feedService.favoriteArticle(payload);
  }

  @MessagePattern('unfavorite_article')
  handleUnfavoriteArticle(payload) {
    return this.feedService.unfavoriteArticle(payload);
  }

  @MessagePattern('delete_article')
  handleDeleteArticle(payload) {
    return this.feedService.deleteArticle(payload.id, payload.title);
  }

  @MessagePattern('create_comment')
  handleCreateComment(comment) {
    return this.commentService.createComment(comment);
  }

  @MessagePattern('get_comments_by_story')
  handleGetCommentsByArticle(payload) {
    return this.commentService.getCommentsByArticle(payload);
  }

  @MessagePattern('delete_comment')
  handleDeleteComments(id) {
    return this.commentService.deleteComment(id);
  }

  @MessagePattern('popular_tags')
  handleGetPopularTags() {
    return this.tagService.getPopularTags();
  }
}
