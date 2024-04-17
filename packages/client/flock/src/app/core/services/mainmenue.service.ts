import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

export enum signalkey {
  Settings = 'Settings',
  Profile = 'Profile',
  Avatar = 'Avatar',
}
interface MenuItem {
  title: string;
  function?: string;
  icon: string;
  link?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MainMenuService {
  public Toggle: WritableSignal<boolean> = signal(false);

  [key: string]: WritableSignal<any>;
  // public Profile: WritableSignal<Array<object>> = signal([]);
  // public Avatar: WritableSignal<Array<object>> = signal([]);
  public State: WritableSignal<string> = signal(signalkey.Settings);

  constructor() {
    const keys = Object.keys(signalkey);
    keys.forEach((key) => {
      this[key] = signal([]);
    });
    this.Toggle = this.Toggle;

    let SettingsArray: Array<MenuItem> = [
      { title: 'theme', function: 'theme', icon: 'settings' },
      { title: 'theme', function: 'theme', icon: 'settings' },
      { title: 'settings', function: 'settings', icon: 'settings' },
      { title: 'mute', function: 'mute', icon: 'settings' },
    ];
    let ProfileArray: Array<MenuItem> = [
      { title: 'profile', link: 'profile', icon: 'settings' },
      { title: 'avatars', link: 'avatar', icon: 'settings' },
      { title: 'settings', function: 'settings', icon: 'settings' },
      { title: 'logout', function: 'settings', icon: 'settings' },
    ];
    let AvatarArray: Array<MenuItem> = [
      { title: 'avatar1', function: 'selectavatar', icon: 'settings' },
      { title: 'avatar2', function: 'selectavatar', icon: 'settings' },
      { title: 'avatar3', function: 'selectavatar', icon: 'settings' },
      { title: 'avatar4', function: 'selectavatar', icon: 'settings' },
    ];
    this[signalkey.Settings].set(SettingsArray);
    this[signalkey.Profile].set(ProfileArray);
    this[signalkey.Avatar].set(AvatarArray);
  }
}
