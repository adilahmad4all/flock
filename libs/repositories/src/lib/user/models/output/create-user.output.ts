import { ArgsType, Field, ObjectType,PartialType } from "@nestjs/graphql";
import { GqlResponse,GqlAction } from "../../../common/response";

import { Type } from "@nestjs/common";
@ObjectType()
export class CreateUserDataOutput {
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  token: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  profile_pic: string;
}

@ObjectType()
export class CreateUserActionOutput {
  @Field({ nullable: true })
  profile_pic_action: string;
}


@ObjectType()
export class CreateUserResponse extends GqlResponse(
  CreateUserDataOutput,
  CreateUserActionOutput
) {}
