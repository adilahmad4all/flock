import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import {
  IonContent,
  IonHeader,
  IonicSlides,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

register();

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  

  ],
  providers:[Storage]
})
export class TutorialPage {
  swiperModules = [IonicSlides];
  showSkip = true;

  
  constructor(
    public router: Router,
    public storage: Storage
  ) {}
  startApp() {
    this.router
      .navigateByUrl('/login', { replaceUrl: true })
      .then(() => this.storage.set('ion_did_tutorial', true));
  }

  onSlideChangeStart(event:any) {
    event.target.isEnd().then((isEnd :any) => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/schedule', { replaceUrl: true });
      }
    });

  
  }
}
