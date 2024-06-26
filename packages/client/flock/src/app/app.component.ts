import { Component, inject, NgModule, Signal,  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  IonApp,
  IonCardContent,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  MenuController,
} from '@ionic/angular/standalone';
import { personAdd, personCircle, settings } from 'ionicons/icons';
import { MainMenuService ,signalkey } from './services/common/mainmenue.service';
import { StorageService } from './services/common/StorageService';
import { AppStateService } from './services/common/appStateService';
import { UserService } from './services/user.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    IonItem,
    IonMenu,
    IonCardContent,
    IonList,
    IonContent,
    IonNote,
    IonLabel,
    IonIcon,
    IonMenuToggle,
    IonListHeader,
    IonFab,
    IonFabButton,
    IonFabList,
    RouterLink,
  ],
  providers: [MainMenuService, StorageService, AppStateService],
})
export class AppComponent {
  menuController = inject(MenuController);
  storageService = inject(StorageService);
  appStateService = inject(AppStateService);

  public mainMenuService: MainMenuService = inject(MainMenuService);
  signalkey = signalkey;
  userData$ = this.appStateService.userData();
  constructor() {
    addIcons({ personCircle, settings, personAdd });
  }

  ngOnInit() {
    console.log('user', this.appStateService.userData());
  }

  showMenu() {
    return !!this.appStateService.userData();
  }

  changeMenuServiceState(key: signalkey) {
    this.mainMenuService.State.set(key);
  }
}
