import { Inject, Injectable, OnModuleInit } from "@nestjs/common";

import { User, UsersSchema } from "./models/user.model";

import { DbOrmService } from "../service/dbOrm.service";
@Injectable()
export class UserRepository implements OnModuleInit {
  private model;

  constructor(public db: DbOrmService) {
    this.model = db.client.loadSchema("UsersSchema", UsersSchema);
  }

  onModuleInit() {
    this.model.syncDB(function (err, result) {
      if (err) console.log(err);
      // result == true if any database schema was updated
      // result == false if no schema change was detected in your models
    });
  }

  async getUsers() {
    return await this.model
      .findAllAsync()
      .then(function (data) {
        console.log(data);
        return data;
      })
      .catch(function (err) {
        console.log(err);
        return err;
      });
    // .toArray();
  }

  async getUserByEmail(email: string): Promise<User> {
    return User.CreateFrom(await this.model.findOneAsync({ email: email }));
  }

  async getUserByUsername(username: string): Promise<User> {
    return User.CreateFrom(
      await this.model.findOneAsync({ username: username })
    );
  }

  async createUser(user: User): Promise<boolean> {
    try {
      var newUser = new this.model(user);
      await newUser.setPassword(user.password);
      const res = await newUser.saveAsync();
      return true;
    } catch (err) {return false;}
  }

  async updateUser(user: User) {
    return User.CreateFrom((await this.model.updateAsync(user)).first());
  }
}
