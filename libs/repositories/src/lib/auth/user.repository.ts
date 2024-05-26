import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { mapping } from "cassandra-driver";
import { User, UsersSchema } from "./models/user.model";
import { CassandraService } from "../service/database.service";
import { DbOrmService } from "../service/dbOrm.service";
@Injectable()
export class UserRepository implements OnModuleInit {
   private model;

  constructor(
    private cassandraService: CassandraService,
    public db: DbOrmService
  ) {
    this.model = db.client.loadSchema("UsersSchema", UsersSchema);
  
  }

  // userMapper: mapping.ModelMapper<User>;

  onModuleInit() {
    this.model.syncDB(function (err, result) {
      if (err) console.log(err);
      // result == true if any database schema was updated
      // result == false if no schema change was detected in your models
    });
  }

  async getUsers() {
    return await this.model.findAllAsync()
      .then(function (data) {
        console.log(data);
        return data;
      })
      .catch(function (err) {
        console.log(err);
        return err;
      });
    // return (await this.userMapper.findAll()).toArray();
  }

  async getUserByEmail(email: string) {
    return await this.model.findOneAsync({ email: email });
  }

  async getUserByUsername(username: string) {
    return await this.model.findOneAsync({ username: username });
  }

  async createUser(user: User) {
    var newUser = new this.model(user);
    newUser.setPassword(user.password);
    return await newUser.saveAsync();
  }

  async updateUser(user: User) {
    return await this.model.updateAsync(user);
  }
}
