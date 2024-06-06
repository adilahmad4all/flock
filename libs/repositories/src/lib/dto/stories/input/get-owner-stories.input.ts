import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetOwnerStoriesInput {
  @Field()
  author: string;

  @Field()
  currentUser: string;

  @Field()
  token: string;
}