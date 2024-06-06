import * as crypto from "crypto";
export class User {
  email: string;
  username: string;
  password?: string;
  bio?: string;
  image?: string;
  tocken?: string;
}

export const UsersSchema = {
  fields: {
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
    email: {
      type: "varchar",
      default: "no email provided",
      rule: {
        required: true,
      },
    },
    phonenumber: {
      type: "varchar",
      default: "no email provided",
      rule: {
        required: true,
      },
    },
    name: { type: "varchar", default: "no name provided" },
    surname: { type: "varchar", default: "no surname provided" },
    complete_name: {
      type: "varchar",
      default: function () {
        return this.name + " " + this.surname;
      },
    },

    password_hash: "blob",
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
  
  table_name: "users",
  methods: {
    setPassword: function (password, callback) {
      const hashed = crypto.pbkdf2Sync(password, "salt", 100000, 512, "sha512");
      this.password_hash = hashed;
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
