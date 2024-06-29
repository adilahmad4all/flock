import {
  Field,
  ObjectType,
  Int,
  PickType,
  PartialType,
  InputType,
} from "@nestjs/graphql";
import * as uuid from "uuid";
import * as Joi from "joi";
import {
  JoiSchema,
  JoiSchemaOptions,
  getClassSchema,
} from "joi-class-decorators";
import { GqlResponse } from "../../common/response";

export const StoriesSchema = {
  fields: {
    id: {
      type: "uuid",
      default: { $db_function: "uuid()" },
    },
    title: {
      type: "text",
      default: "no title provided",
      rule: {
        required: true,
      },
    },
    description: {
      type: "varchar",
      default: "no description provided",
    },
    content: {
      type: "varchar",
      default: "no content provided",
    },
    owner: {
      type: "uuid",
      rule: {
        required: true,
      },
    },
    gallery: {
      type: "set",
      typeDef: "<varchar>",
    },
    comments_total: {
      type: "int",
      default: 0,
    },
    reaction_total: {
      type: "int",
      default: 0,
    },
    up_vote_total: {
      type: "int",
      default: 0,
    },
    down_vote_total: {
      type: "int",
      default: 0,
    },
  },
  key: [["id"], "created_at", "owner"],
  clustering_order: { created_at: "desc" },

  table_name: "stories",
  methods: {
    setGallery: async function (number: number) {
      for (var i = 0; i < number; i) {
        this.gallery.push(uuid.v4());
      }
    },
  },

  options: {
    timestamps: {
      createdAt: "created_at", // defaults to createdAt
      updatedAt: "updated_at", // defaults to updatedAt
    },
    versions: {
      key: "__v", // defaults to __v
    },
  },
};

@ObjectType()
export class Stories {
  @JoiSchema(Joi.string().guid().optional())
  @Field()
  id: string;

  @JoiSchema(Joi.string().max(60).required())
  @Field()
  title: string;

  @JoiSchema(Joi.string().max(200).optional())
  @Field()
  description: string;

  @JoiSchema(Joi.string().optional())
  @Field()
  content: string;

  @JoiSchema(Joi.array().items(Joi.string().guid()).optional())
  @Field((type) => [String], { nullable: true })
  gallery: [string];

  @JoiSchema(Joi.number().optional())
  @Field()
  gallery_total: number;

  @JoiSchema(Joi.number().optional())
  @Field((type) => Int, { nullable: true })
  comments_total: number;

  @JoiSchema(Joi.number().optional())
  @Field((type) => Int, { nullable: true })
  reaction_total: number;

  @JoiSchema(Joi.number().optional())
  @Field((type) => Int, { nullable: true })
  up_vote_total: number;

  @JoiSchema(Joi.number().optional())
  @Field((type) => Int, { nullable: true })
  down_vote_total: number;

  @JoiSchema(Joi.string().guid().optional())
  @Field()
  owner: string;

  @JoiSchema(Joi.string().optional())
  @Field()
  username: string;

  @JoiSchema(Joi.date().optional())
  @Field({ nullable: true })
  created_at: string;

  @JoiSchema(Joi.date().optional())
  @Field({ nullable: true })
  updated_at: string;
}

// input classes
@InputType()
export class StoriesCreateInput extends PickType(
  Stories,
  ["title", "description", "content", "gallery_total"] as const,
  InputType
) {}

@InputType()
export class StoriesUpdateInput extends PartialType(
  PickType(Stories, ["title", "description", "content", "gallery"] as const),
  InputType
) {}

@InputType()
export class StoriesByIdInput extends PartialType(
  PickType(Stories, ["id"] as const),
  InputType
) {}

@InputType()
export class StoriesByUsernameInput extends PartialType(
  PickType(Stories, ["username"] as const),
  InputType
) {}

// output classes
@ObjectType()
export class StoriesOutput extends PickType(Stories, [
  "title",
  "description",
  "content",
  "gallery",
  "comments_total",
  "reaction_total",
  "up_vote_total",
  "down_vote_total",
  "owner",
] as const) {}

@ObjectType()
export class StoriesArrayOutput {
  @Field((type) => [StoriesOutput])
  stories: Array<StoriesOutput>;
}

@ObjectType()
export class StoriesCreateActionOutput {
  @Field(() => [String], { nullable: true })
  gallery_action: [string];
}
@ObjectType()
export class StoriesCreateOutputResponse extends GqlResponse(
  StoriesOutput,
  StoriesCreateActionOutput
) {}
@ObjectType()
export class StoriesSingleOutputResponse extends GqlResponse(StoriesOutput) {}
@ObjectType()
export class StoriesArrayResponse extends GqlResponse(StoriesArrayOutput) {}
