import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN, REGISTER } from '../shared/constants/queries/auth-queries';
import { URLs } from '../shared/constants/common';

@Injectable()
export class AuthService {
  private readonly apollo = inject(Apollo);
  constructor(
 
  ) { }

  register(username: string, email: string, password: string, image: string = URLs.PROFILE_IMAGE) {
    return this.apollo.mutate({
      mutation: REGISTER,
      variables: {
        username,
        email,
        password,
        image
      }
    });
  }

  login(email: string, password: string) {
    console.log('authservice');
    return this.apollo.watchQuery({
      query: LOGIN,
      variables: {
        email,
        password
      }
    }).valueChanges;
  }
}