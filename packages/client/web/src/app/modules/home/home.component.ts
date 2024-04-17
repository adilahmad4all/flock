import { Component } from '@angular/core';
import { ITab } from 'ui';
import { TAB } from '../../shared/constants/common';
import { ITag } from '../../shared/model/ITag';

@Component({
  selector: 'ithub-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  public tabs: ITab[] = [
    {
      title: TAB.YOUR
    },
    {
      title: TAB.GLOBAL
    }
  ];

  tagClick(tag: ITag) {
    const tabItem: ITab = {
      title: tag.name
    };

    this.tabs = [...this.tabs, tabItem];
  }
}
