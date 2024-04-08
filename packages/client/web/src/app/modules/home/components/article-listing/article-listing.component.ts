import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArticle } from '../../../../shared/model/IArticle';
import { DatePipe } from '@angular/common';
import { ArticleService } from '../../../../services/article.service';
import { IUser } from '../../../../shared/model/IUser';
import { AppStateService } from '../../../../services/common/appStateService';
import { Utilities } from '../../../../shared/utilities/utilities';
import { Router } from '@angular/router';

@Component({
  selector: 'ithub-article-listing',
  templateUrl: './article-listing.component.html',
  styleUrls: ['./article-listing.component.scss'],
})
export class ArticleListingComponent implements OnInit {

  @Input()
  public articles: IArticle[] = [];

  @Output() refreshList = new EventEmitter<void>();

  private currentUser!: IUser;
  private token!: string;
  public disableFavBtn = false;

  constructor(
    public readonly datePipe: DatePipe,
    private readonly articleService: ArticleService,
    private readonly utilities: Utilities,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentUser = AppStateService.getCurrentUserStatic();
    this.token = AppStateService.getUserTokenStatic();
  }

  onFavorite(article: IArticle) {
    this.disableFavBtn = true;

    if (article.favorited) {
      this.articleService
        .unfavoriteArticle(article.title, this.currentUser.email, this.token)
        .subscribe({
          next: (response) => {
            this.disableFavBtn = false;

            if (response.errors) {
              this.utilities.onErr(response.errors[0]);
            }
            if (response.data) {
              this.refreshList.emit();
            }
          },
          error: (err) => {
            this.disableFavBtn = false;

            this.utilities.onErr(err);
          }
        });
    } else {
      this.articleService
        .favoriteArticle(article.title, this.currentUser.email, this.token)
        .subscribe({
          next: (response) => {
            this.disableFavBtn = false;

            if (response.errors) {
              this.utilities.onErr(response.errors[0]);
            }
            if (response.data) {
              this.refreshList.emit();
            }
          },
          error: (err) => {
            this.disableFavBtn = false;

            this.utilities.onErr(err);
          }
        });
    }
  }

  profileClick(article: IArticle) {
    this.router.navigate([`/profile/${article.author.username}`]);
  }

  articleClick(article: IArticle) {
    this.router.navigate([`/articles/${article.slug}`]);
  }
}
