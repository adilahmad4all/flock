import { Injectable, OnModuleInit } from "@nestjs/common";

import { DbOrmService } from "../service/dbOrm.service";
import { FollowerSchema } from "./models/follower.model";

@Injectable()
export class FollowerRepository implements OnModuleInit {
  private model;

  constructor(public db: DbOrmService) {
    this.model = db.client.loadSchema("FollowerSchema", FollowerSchema);
  }

  // userMapper: mapping.ModelMapper<User>;

  onModuleInit() {
    this.model.syncDB(function (err, result) {
      if (err) console.log(err);
      // result == true if any database schema was updated
      // result == false if no schema change was detected in your models
    });
  }

  async getAll() {
    // return await (await this.followerMapper.findAll()).toArray();
  }

  async getFollowers(email: string) {
    // const res = await this.cassandraService.client.execute(
    //   `SELECT * FROM followers WHERE followed_profile = '${email}' ALLOW FILTERING`
    // );

    // return res?.rows;
  }

  async follow(followed, follower) {
    var newFollower = new this.model({ followed, follower });

    return await newFollower.saveAsync();
  }

  unfollow(followed_profile, followed_by) {

  }
}
