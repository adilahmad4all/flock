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
import{ Clicker} from "../login/login.page"
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
} from '@ionic/angular/standalone';
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

            this.authSuccessText = TEXTS.AuthSuccessText;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
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


