import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AppConstants } from "../../shared/constants/app-constants";
import { IUser } from "../../shared/model/IUser";
import { StorageService } from "./secureLocalStorageService";

@Injectable()
export class AppStateService {
  storageService = inject(StorageService);
  private userTokenDataSource = new BehaviorSubject<string>(this.getUserToken());
  public userTokenData$ = this.userTokenDataSource.asObservable();

  private currentUserDataSource = new BehaviorSubject<IUser | undefined>(undefined);
  public currentUserData$ = this.currentUserDataSource.asObservable();

   getUserTokenStatic() {
    return this.storageService.getValueByKey(AppConstants.AUTH_TOKEN_KEY);
  }

  public getCurrentUserStatic() {
    const userInfo = this.storageService.getValueByKey(AppConstants.USER_INFO_KEY);
    return userInfo && JSON.parse(userInfo);
  }

  public setUserToken(token: string) {
    this.storageService.setKeyValue(AppConstants.AUTH_TOKEN_KEY, token);
    this.userTokenDataSource.next(this.getUserToken());
  }

  public resetUser() {
    this.storageService.removeKey(AppConstants.AUTH_TOKEN_KEY);
    this.storageService.removeKey(AppConstants.USER_INFO_KEY);
    this.userTokenDataSource.next('');
    this.currentUserDataSource.next(undefined);
  }

  public getUserToken() {
    return this.storageService.getValueByKey(AppConstants.AUTH_TOKEN_KEY);
  }

  public getCurrentUser() {
    const userInfo = this.storageService.getValueByKey(AppConstants.USER_INFO_KEY);
    this.currentUserDataSource.next(userInfo && JSON.parse(userInfo));
  }

  public setCurrentUser(user: IUser) {
    this.storageService.setKeyValue(AppConstants.USER_INFO_KEY, JSON.stringify(user));
    this.currentUserDataSource.next(this.getCurrentUserStatic());
  }
}