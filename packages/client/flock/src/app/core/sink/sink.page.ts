import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';


@Component({
  selector: 'app-feed',
  templateUrl: 'sink.page.html',
  styleUrls: ['sink.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class SinkPage {
  constructor() {}
}
