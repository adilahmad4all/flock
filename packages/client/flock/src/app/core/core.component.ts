import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { earth, chatbubble, personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-core',
  templateUrl: 'core.nav.html',
  styleUrls: ['core.nav.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class CoreComponent {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({  earth, chatbubble, personCircle});
  }
}
