import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { Author } from "../owner.dto";

@ArgsType()
@ObjectType()
export class CreateArticleOutput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  body: string;

  @Field()
  tags: string;

  @Field()
  slug: string;

  @Field()
  author: Author;

  @Field()
  createdAt: string;

  @Field({ nullable: true })
  updatedAt: string;
}