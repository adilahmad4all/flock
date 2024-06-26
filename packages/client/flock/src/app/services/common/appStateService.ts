import { inject, Injectable, WritableSignal, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AppConstants } from "../../shared/constants/app-constants";
import { IUser } from "../../shared/model/IUser";
import { StorageService } from "./StorageService";
import { Observable } from "@apollo/client/utilities";

@Injectable({ providedIn: 'root' })
export class AppStateService {
  // storageService = inject(StorageService);
  public userToken: WritableSignal<string | null> = signal(null); ///
  public userData: WritableSignal<IUser | null> = signal(null); //{username: "username", password: "password",email: "email",token: "token"}

  constructor(public storageService: StorageService) {
    this.init();
  }

  public async init() {
    await this.getUserToken();
    //  this.updateUserData();

    this.userData.set({
      username: 'username',
      password: 'password',
      email: 'email',
      token: 'token',
    });
  }
  public async getUserToken() {
    const token: string = await this.storageService.getValueByKey(
      AppConstants.AUTH_TOKEN_KEY,
    );
    this.userToken.set(token);
  }

  public async updateUserData() {
    const userInfo = await this.storageService.getValueByKey(
      AppConstants.USER_INFO_KEY,
    );
    this.userData.set(userInfo && JSON.parse(userInfo));
  }

  public async setCurrentUser(user: IUser) {
    this.storageService.setKeyValue(
      AppConstants.USER_INFO_KEY,
      JSON.stringify(user),
    );
    await this.updateUserData();
  }

  public async setUserToken(token: string) {
    await this.storageService.setKeyValue(AppConstants.AUTH_TOKEN_KEY, token);
    await this.getUserToken();
  }

  public resetUser() {
    this.storageService.removeKey(AppConstants.AUTH_TOKEN_KEY);
    this.storageService.removeKey(AppConstants.USER_INFO_KEY);
    this.userData.set(null);
  }
}