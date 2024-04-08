import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from '../../../services/common/appStateService';
import { IUser } from '../../model/IUser';

import { IonButton, IonContent ,IonIcon, IonHeader,IonToolbar,IonTitle} from '@ionic/angular/standalone';
import {  } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';
import {RouterModule} from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ithub-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonButton, IonContent,RouterModule,NgIf,IonIcon, IonHeader,IonToolbar,IonTitle],
  providers:[AppStateService]
})

export class HeaderComponent implements OnInit, OnDestroy {
  public userInfo: IUser | null | undefined;
  private currentUserSubscription: Subscription = new Subscription();

  constructor(
    private appStateService: AppStateService
  ) { }

  ngOnInit(): void {
    this.appStateService.getCurrentUser();
    console.log("user", this.appStateService)
    this.currentUserSubscription = this.appStateService.currentUserData$.subscribe((user) => {
      this.userInfo = user||null;
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
