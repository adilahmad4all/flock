export class Follower {
  id: string;
  followed: string;
  follower: string;
}



export const FollowerSchema = {
  fields: {
    id: {
      type: "uuid",
      default: { $db_function: "uuid()" },
    },
    followed: {
      type: "uuid",
    },
    follower: {
      type: "uuid",
    },

    created: {
      type: "timestamp",
      default: { $db_function: "toTimestamp(now())" },
    },
  },
  key: [["id"], "followed"],
  clustering_order: { created: "desc" },

  indexes: [],

  table_name: "followers",

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
