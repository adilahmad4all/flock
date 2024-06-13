import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { DbOrmService } from '../service/dbOrm.service';
import { Profile, ProfileSchema } from "./models/profile.model";

@Injectable()
export class ProfileRepository implements OnModuleInit {
  private model;
  constructor(private db: DbOrmService) {
    this.model = db.client.loadSchema("ProfileSchema", ProfileSchema);
  }

  profileMapper: mapping.ModelMapper<Profile>;

  onModuleInit() {
    this.model.syncDB(function (err, result) {
      if (err) console.log(err);
      // result == true if any database schema was updated
      // result == false if no schema change was detected in your models
    });
  }

  async getProfilesById(id: string) {
    return await this.model.findOneAsync({ owner: id });
      // `SELECT * FROM users WHERE username = '${username}' ALLOW FILTERING`
   

  }


}