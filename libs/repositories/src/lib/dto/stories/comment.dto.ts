import { Field, ObjectType } from "@nestjs/graphql";
import { Author } from "./owner.dto";

@ObjectType()
export class Comment {
  @Field()
  id: string;

  @Field()
  body: string;

  @Field()
  article: string;

  @Field()
  author: Author;

  @Field()
  created_at: string;
}
