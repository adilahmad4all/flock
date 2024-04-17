import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';


@Component({
  selector: 'app-explore',
  templateUrl: 'communities.page.html',
  styleUrls: ['communities.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class CommunitiesPage {
  constructor() {}
}
