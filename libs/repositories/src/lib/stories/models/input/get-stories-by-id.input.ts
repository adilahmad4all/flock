import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetStoriesByIdInput {
  @Field()
  articleID: string;

  @Field()
  currentUser: string;

  @Field()
  token: string;
}