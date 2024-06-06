import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateStoriesInput {
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
  author: string;

  @Field()
  createdAt: string;

  @Field({ nullable: true })
  updatedAt: string;

  @Field()
  token: string;
}