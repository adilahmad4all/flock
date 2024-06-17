interface errCode {
  message: string;
  code: string;
}
export class KafkaResponse<T, Y> {
  error: null | errCode = null;
  data: null | T = null;
  action: null | Y = null;
}

import { Type } from "@nestjs/common";
import {  Field, ObjectType,Int  } from "@nestjs/graphql";
@ObjectType()
export class GqlErrCode {
  @Field({ nullable: true })
  message: string;

  @Field({ nullable: true })
  code: string;
}

@ObjectType()
export class GqlAction {
  @Field((type) => Int, { nullable: true })
  offset?: string;

  @Field((type) => Int, { nullable: true })
  limit?: string;
}



export function GqlResponse<T, Z>(
  dataType: Type<T>,
  actionType: Type<Z> = GqlAction as Type<Z>
) {
  @ObjectType({ isAbstract: true })
  abstract class GqlResponseClass {
    @Field((type) => GqlErrCode, { nullable: true })
    error?: GqlErrCode | null;
    @Field((type) => dataType, { nullable: true })
    data?: T | null;
    @Field((type) => actionType, { nullable: true })
    action?: Z | null;
  }

  return GqlResponseClass;
}
