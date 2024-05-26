import { Injectable, OnModuleInit } from "@nestjs/common";
import { DbOrmService } from "../service/dbOrm.service";
import { CommentsShema } from "./models/comments.model";

@Injectable()
export class CommentRepository implements OnModuleInit {
  private model;

  constructor(public db: DbOrmService) {
    this.model = db.client.loadSchema("CommentsShema", CommentsShema);
  }

  onModuleInit() {
    this.model.syncDB(function (err, result) {
      if (err) console.log(err);
      // result == true if any database schema was updated
      // result == false if no schema change was detected in your models
    });
  }

  async getByStory(story) {
    return this.model.findAllAsync({ parent: story.id });
  }

  create(comment) {
    return new this.model.saveAsync(comment);
  }

  remove(id) {
    return this.model.delete({ id });
  }
}
