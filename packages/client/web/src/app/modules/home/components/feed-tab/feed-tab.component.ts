import { Component, Input, OnChanges} from '@angular/core';
import { IUser } from '../../../../shared/model/IUser';
import { AppStateService } from '../../../../services/common/appStateService';
import { ArticleService } from '../../../../services/article.service';
import { Utilities } from '../../../../shared/utilities/utilities';
import { IArticle } from '../../../../shared/model/IArticle';
import { ITab } from 'ui';
import { TAB } from '../../../../shared/constants/common';

@Component({
  selector: 'ithub-feed-tab',
  templateUrl: './feed-tab.component.html',
  styleUrls: ['./feed-tab.component.scss'],
})

export class FeedTabComponent implements OnChanges {

  @Input() tabs: ITab[] = [];
  public currentTab = '';
  private currentUser!: IUser;
  private token!: string;
  public articles: IArticle[] = [];

  constructor(
    private readonly utilities: Utilities,
    private readonly articleService: ArticleService
  ) { }

  ngOnChanges(): void {
    this.currentUser = AppStateService.getCurrentUserStatic();
    this.token = AppStateService.getUserTokenStatic();
  }

  tabChange(tab?: ITab) {
    if (tab) {
      this.currentTab = tab.title;
      this.getFeed();
    }
  }

  getFeed() {
    if (this.currentTab === TAB.YOUR) {
      this.articleService
        .getByAuthor(this.currentUser.email, this.currentUser.email, this.token)
        .subscribe({
          next: (response) => {
            if (response.errors) {
              this.utilities.onErr(response.errors[0]);
            }

            if (response.data) {
              const data = response.data;
              this.articles = Object(data).getArticlesByAuthor as IArticle[];
            }
          },
          error: (err) => {
            this.utilities.onErr(err);
          }
        });
    } else if (this.currentTab === TAB.GLOBAL) {
      this.articleService
        .getAll(this.currentUser.email, this.token)
        .subscribe({
          next: (response) => {
            if (response.errors) {
              this.utilities.onErr(response.errors[0]);
            }

            if (response.data) {
              const data = response.data;
              this.articles = Object(data).getAllArticles as IArticle[];
            }
          },
          error: (err) => {
            this.utilities.onErr(err);
          }
        });
    } else {
      this.articleService
        .getByTag(this.currentTab, this.currentUser.email, this.token)
        .subscribe({
          next: (response) => {
            if (response.errors) {
              this.utilities.onErr(response.errors[0]);
            }

            if (response.data) {
              const data = response.data;
              this.articles = Object(data).getArticlesByTag as IArticle[];
            }
          },
          error: (err) => {
            this.utilities.onErr(err);
          },
        });
    }
  }
}
