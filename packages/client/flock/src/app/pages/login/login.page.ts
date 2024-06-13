import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  IonInput,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCard,

} from '@ionic/angular/standalone';
import { AppStateService } from 'src/app/services/common/appStateService';
import { IUser } from 'src/app/shared/model/IUser';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonButton,
    IonList,
    IonMenuButton,
    IonItem,
    IonLabel,
    IonText,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  appStateService = inject(AppStateService);
  authService = inject(AuthService);
  router = inject(Router);

  public LoginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public authErr = '';
  public authSuccessText = '';
  public disableForm = false;

  submitted = false;

  constructor() {}

  ngOnInit() {}

  public clicker() {
    console.log('clicked');
  }

  public loginservice(username: string, password: string) {
    this.submitted = true;
    console.log(username, password);
    if (username?.trim().length && password?.trim().length) {
      this.appStateService.resetUser();

      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.disableForm = false;

          if (response.errors) {
            this.authErr = response.errors[0].message;
          }

          if (response.data) {
            this.authErr = '';
            const data = response.data;
            const dataObj = Object(data);
            const access_token = dataObj.loginUser.token;
            this.appStateService.setUserToken(access_token);
            const userInfo: IUser = {
              email: dataObj.loginUser.email,
              username: dataObj.loginUser.username,
              password: password,
              bio: dataObj.loginUser.bio,
              image: dataObj.loginUser.image,
            };
            this.appStateService.setCurrentUser(userInfo);
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}


export function Clicker ( ){
    console.log('clicker clicked')
}