import { Injectable, OnModuleInit } from '@nestjs/common';

import { User, IUser } from './models/user.model';
import { SurrealService } from '../surreal.service';
import { create, query, select, update } from 'cirql';
@Injectable()
export class UserRepository implements OnModuleInit {

  constructor(private surrealService: SurrealService) { }

  onModuleInit() {
    
  }

  async getUsers() {
    return this.surrealService.client.execute({ 
      query: select().from('user').with(User)
  });

  }

  async getUserByEmail(email: string) {
    return this.surrealService.client.execute({ 
      query: select().from('user').where(`email == ${email}`).with(User).limit(1)
  });

  }

  async getUserByUsername(username: string) {
    return this.surrealService.client.execute({ 
      query: select().from('user').where(`username == ${username}`).with(User).limit(1)
  }); 
  }

  createUser(user: IUser) {
    return this.surrealService.client.execute({ 
          query: create('user').setAll(user).with(User)
      });
    // return this.userMapper.insert(user);
  }

  updateUser(user: IUser) {
    return this.surrealService.client.execute({ 
      query: update('user').setAll(user).with(User)
  });
   
  }
}