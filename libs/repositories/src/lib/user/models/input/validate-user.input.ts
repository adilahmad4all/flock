import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ValidateUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}