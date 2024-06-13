export class Profile {
  user_id?: string;
  username: string;
  bio?: string;
  image?: string;
  following?: boolean;
}

export const ProfileSchema = {
  fields: {
    owner: {
      type: "uuid",
     
    },
    id: {
      type: "uuid",
      default: { $db_function: "uuid()" },
    },
    username: {
      type: "varchar",
      default: "no username provided",
      rule: {
        required: true,
      },
    },

    name: { type: "varchar", default: "no name provided" },
    surname: { type: "varchar", default: "no surname provided" },

    age: "int",
    active: "boolean",
    created: {
      type: "timestamp",
      default: { $db_function: "toTimestamp(now())" },
    },
  },
  key: [["id"], "created"],
  clustering_order: { created: "desc" },

  indexes: ["name", "username", "email"],

  table_name: "avatars",

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
