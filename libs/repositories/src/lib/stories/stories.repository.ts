import { Injectable, OnModuleInit } from '@nestjs/common';

import { DbOrmService } from '../service/dbOrm.service';
import { StoriesSchema } from './models/stories.model';

@Injectable()
export class StoriesRepository implements OnModuleInit {

  private model;

  constructor(
       public db: DbOrmService
  ) {
    this.model = db.client.loadSchema("StoriesSchema", StoriesSchema);
  
  }


  onModuleInit() {
    this.model.syncDB(function (err, result) {
      if (err) console.log(err);
      // result == true if any database schema was updated
      // result == false if no schema change was detected in your models
    });
  }

  create(story) {
    return new this.model.saveAsync(story);
  }

  async getByID(id: string) {
    return await (await this.model.findOneAsync({id: id })).first();
  }
 

  updateArticle(story) {
    return this.model.updateAsync(story);
  }

  async getAll() {
    return await (await this.model.findAllAsync()).toArray();
  }

  async getByOwner(owner: string) {
    return await (await this.model.findOneAsync({ owner:owner })).first();

 
  }

  delete(id, title) {
    return this.model.delete({ id, title });
  }

}