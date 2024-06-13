import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,

  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

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
  IonIcon
} from '@ionic/angular/standalone';

import { IUser } from 'src/app/shared/model/IUser';
import { AppStateService } from 'src/app/services/common/appStateService';
import { AuthService } from 'src/app/services/auth.service';
import { TEXTS } from 'src/app/shared/constants/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
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
    IonIcon,
    RouterLink,
    ReactiveFormsModule,
  ],
})
export class SignupPage implements OnInit {
  appStateService = inject(AppStateService);
  authService = inject(AuthService);
  router = inject(Router);

  public signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  submitted = false;
  authErr: string | undefined = undefined;
  authSuccessText: TEXTS | undefined = undefined;

  public signUp() {
    if (
      this.signUpForm.value.username?.trim() &&
      this.signUpForm.value?.email.trim().length &&
      this.signUpForm.value.password.trim().length
    ) {
      this.authService
        .register(
          this.signUpForm.value.username,
          this.signUpForm.value.email,
          this.signUpForm.value.password,
        )
        .subscribe({
          next: (response) => {
            if (response.errors) {
              this.authErr = response.errors[0].message;
            }

            if (response.data) {
              this.authErr = '';
              const data = response.data;
              const dataObj = Object(data);
              const access_token = dataObj.createUser.token;
              this.appStateService.setUserToken(access_token);
              const userInfo: IUser = {
                email: dataObj.createUser.email,
                username: dataObj.createUser.username,
                bio: dataObj.createUser.bio,
                image: dataObj.createUser.image,
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

  constructor() {}

  ngOnInit() {}
}


