export const CommentsShema = {
  fields: {
    id: {
      type: "uuid",
      default: { $db_function: "uuid()" },
    },
    parent: {
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
      default: { $db_function: "uuid()" },
    },

    gallery: {
      type: "set",
      typeDef: "<varchar>",
    },

   
  },
  key: [["id"], "created_at", "owner"],
  clustering_order: { created_at: "desc" },

  table_name: "stories_comments",

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

import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Comment {
  @Field()
  id: string;

  @Field()
  body: string;

  @Field()
  article: string;

  @Field()
  created_at: string;
}
