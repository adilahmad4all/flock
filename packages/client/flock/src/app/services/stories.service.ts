import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import {
  CREATE_STORIES,
  DELETE_STORIES,

  GET_STORIES,
  GET_STORIES_BY_AUTHOR,
  GET_STORIES_BY_TAG,
  GET_STORIES_BY_ID,

  UPDATE_STORIES
} from "../shared/queries/stories-queries";
import { IArticle } from "../shared/model/IArticle";

@Injectable()
export class ArticleService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  create(article: IArticle) {
    return this.apollo.mutate({
      mutation: CREATE_STORIES,
      variables: article
    });
  }

  update(article: IArticle) {
    return this.apollo.mutate({
      mutation: UPDATE_STORIES,
      variables: article
    });
  }

  getByID(articleID: string, currentUser: string, token: string) {
    return this.apollo.query({
      query: GET_STORIES_BY_ID,
      variables: {
        articleID,
        currentUser,
        token
      },
      fetchPolicy: 'network-only'
    });
  }

  getAll(currentUser: string, token: string) {
    return this.apollo.query({
      query: GET_STORIES,
      variables: {
        currentUser,
        token
      },
      fetchPolicy: 'network-only'
    });
  }

  getByTag(tag: string, currentUser: string, token: string) {
    return this.apollo.query({
      query: GET_STORIES_BY_TAG,
      variables: {
        tag,
        currentUser,
        token
      }
    });
  }

  getByAuthor(author: string, currentUser: string, token: string) {
    return this.apollo.query({
      query: GET_STORIES_BY_AUTHOR,
      variables: {
        author,
        currentUser,
        token
      },
      fetchPolicy: 'network-only'
    });
  }


  delete(articleID: string, articleTitle: string, token: string) {
    return this.apollo.mutate({
      mutation: DELETE_STORIES,
      variables: {
        articleID,
        articleTitle,
        token
      }
    });
  }
}