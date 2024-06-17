import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginUserInput {
  @Field()
  username: string;
  
  @Field( { nullable: true } )
  email: string;

  @Field()
  password: string;
}