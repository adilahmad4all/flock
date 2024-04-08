import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppStateService } from '../../services/common/appStateService';
import { UserService } from '../../services/user.service';
import { BUTTON, ERR, SUCCESS, TEXTS } from '../../shared/constants/common';
import { IUser } from '../../shared/model/IUser';

@Component({
  selector: 'ithub-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public userInfo!: IUser;
  private currentUserSubscription: Subscription = new Subscription();

  public settingsForm: FormGroup;
  public userUpdateErr = '';
  public updateSuccessText = '';
  public updateBtnText: string = BUTTON.UPDATE_SETTINGS;
  public disableForm = false;
  public settingsFormDirty = false;

  constructor(
    private appStateService: AppStateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.settingsForm = this.formBuilder.group({
      image: [''],
      username: [''],
      bio: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.appStateService
      .currentUserData$
      .subscribe((user) => {
        this.userInfo = {
          username: user?.username || '',
          email: user?.email || '',
          bio: user?.bio || '',
          image: user?.image || '',
          password: user?.password || ''
        };
        this.settingsForm.patchValue({ ...this.userInfo });
      });

    this.settingsForm.valueChanges.subscribe(newValues => {
      if (
        newValues.username !== this.userInfo.username ||
        newValues.bio !== this.userInfo.bio ||
        newValues.image !== this.userInfo.image ||
        newValues.password !== this.userInfo.password
      ) {
        this.settingsFormDirty = true;
      } else {
        this.settingsFormDirty = false;
      }
    })
  }

  onSubmit() {
    this.updateSuccessText = '';
    this.disableForm = true;
    this.updateBtnText = TEXTS.LOADING;
    this.userService
      .updateUser(this.settingsForm.value, AppStateService.getUserTokenStatic())
      .subscribe({
        next: (response) => {
          this.disableForm = false;
          this.updateBtnText = BUTTON.UPDATE_SETTINGS;
          if (response.data) {
            this.userUpdateErr = '';
            this.appStateService.setCurrentUser(this.settingsForm.value);
            this.updateSuccessText = SUCCESS.UPDATE;
          }
        },
        error: (err) => {
          this.disableForm = false;
          this.updateBtnText = BUTTON.UPDATE_SETTINGS;
          this.updateSuccessText = '';
          this.userUpdateErr = err['message'] || ERR.UNEXPECTED;

          if (err['message'] && err['message'] === ERR.UNAUTHORIZED) {
            this.appStateService.resetUser();
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }
        }
      });
  }

  logout() {
    this.appStateService.resetUser();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
