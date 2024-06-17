import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetAllStoriessInput {

  @Field()
  currentUser: string;

  @Field()
  token: string;
}