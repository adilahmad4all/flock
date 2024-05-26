import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInfiniteScrollContent, IonAvatar, IonItemDivider, IonLabel, IonList, IonItem, InfiniteScrollCustomEvent,IonInfiniteScroll, ModalController, IonButtons, IonButton, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NgxWigModule } from 'ngx-wig';
import { FilePicker } from '@capawesome/capacitor-file-picker';
@Component({
  selector: 'app-stories-create',
  templateUrl: 'stories.modal.html',
  styleUrls: ['stories.modal.scss'],
  host: {'class': 'fullscreen'},
  
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonInfiniteScrollContent,IonInfiniteScroll,IonList, IonAvatar,IonItem,IonLabel,IonInput,IonButtons,IonButton,FormsModule,NgxWigModule],
})
export class StoriesModal implements OnInit {

  constructor(private modalCtrl: ModalController) {}
  public title:string="";
  public description:string="";
  public content:string="";
  public gallery:any;

  ngOnInit() {
    
  }
   pickFiles = async () => {
    this.gallery = await FilePicker.pickFiles({
      types: ['image/png'],
    });
  };

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.title, 'confirm');
  }
 
}


