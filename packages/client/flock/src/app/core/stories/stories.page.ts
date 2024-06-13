import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInfiniteScrollContent, IonAvatar, IonItemDivider, IonLabel, IonList, IonItem, InfiniteScrollCustomEvent,IonInfiniteScroll, ModalController, IonFabButton, IonIcon,  } from '@ionic/angular/standalone';
import { StoriesModal } from './createModal/stories.modal';


@Component({
  selector: 'app-stories',
  templateUrl: 'stories.page.html',
  styleUrls: ['stories.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonInfiniteScrollContent,IonInfiniteScroll,IonList, IonAvatar,IonItem,IonLabel,IonFabButton,IonIcon],
})
export class StoriesPage implements OnInit {
  modalCtrl = inject(ModalController);

  constructor() {


  }
  items :any= [];

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  // onIonInfinite(ev:InfiniteScrollCustomEvent) {
  //   this.generateItems();
  //   setTimeout(() => {
  //     (ev as InfiniteScrollCustomEvent).target.complete();
  //   }, 500);
  // }

  // async openModal() {
  //   const modal = await this.modalCtrl.create({
  //     component: StoriesModal,
  //     cssClass: 'fullscreen'
  //   });
  //   modal.present();

  //   const { data, role } = await modal.onWillDismiss();

  //   if (role === 'confirm') {
  //     console.log(`Hello, ${data}!`);
  //   }
  // }
}



