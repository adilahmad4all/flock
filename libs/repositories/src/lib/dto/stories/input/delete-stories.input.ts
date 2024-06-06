import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteStoriesInput {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  token: string;
}