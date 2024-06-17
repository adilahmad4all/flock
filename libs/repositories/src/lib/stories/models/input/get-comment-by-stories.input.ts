import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetCommentByStoriesInput {
  @Field()
  ID: string;

  @Field()
  token: string;
}