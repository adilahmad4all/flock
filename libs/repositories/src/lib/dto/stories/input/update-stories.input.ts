import { Field, InputType } from "@nestjs/graphql";
import { Author } from "../owner.dto";

@InputType()
export class UpdateStoriesInput {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  author: string;

  @Field()
  body: string;

  @Field()
  tags: string;

  @Field()
  slug: string;

  @Field()
  updatedAt: string;

  @Field()
  token: string;
}
