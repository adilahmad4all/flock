import { Component, inject, NgModule, Signal } from '@angular/core';
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
import { MainMenuService ,signalkey } from './core/services/mainmenue.service';

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
  providers:[MainMenuService]
})
export class AppComponent {
  menuController= inject(MenuController);

  public mainMenuService:MainMenuService = inject(MainMenuService);
  signalkey = signalkey;
  public appPages: any[] = [
    { title: 'som1', link: 'link', icon: 'triangle' },
    { title: 'som1', link: 'link', icon: 'triangle' },
    { title: 'som1', link: 'link', icon: 'triangle' },
    { title: 'som1', link: 'link', icon: 'triangle' },
  ];
  constructor() {
   
    addIcons({  personCircle, settings, personAdd});
  }

  ngOnInit() {
  
  }

  changeMenuServiceState(key: signalkey) {
      this.mainMenuService.State.set(key);
  }
 
}
