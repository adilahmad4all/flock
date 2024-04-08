import { Injectable, OnModuleInit } from '@nestjs/common';
// import { mapping } from 'cassandra-driver';
import { User } from './models/user.model';
import { SurrealService } from '../surreal.service';
import { create, query, select, update } from 'cirql';
@Injectable()
export class UserRepository implements OnModuleInit {

  constructor(private surrealService: SurrealService) { }

  onModuleInit() {

    

  }

  async getUsers() {
    return this.surrealService.client.execute({ 
      query: select().from('user')
  });

  }

  async getUserByEmail(email: string) {
    return await (await this.userMapper.find({ email })).first();
  }

  async getUserByUsername(username: string) {


    const res = await this.cassandraService.client.execute(`SELECT * FROM users WHERE username = '${username}' ALLOW FILTERING`);
    if (res?.rows?.length) {
      return true;
    }

    return false;
  }

  createUser(user: User) {
    return this.surrealService.client.execute({ 
          query: create('user').setAll(user)
      });
    // return this.userMapper.insert(user);
  }

  updateUser(user: User) {
    return this.surrealService.client.execute({ 
      query: update('user').setAll(user)
  });
   
  }
}