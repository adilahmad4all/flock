import * as bcrypt from "bcrypt";
export class User {
  id?: string | undefined = undefined;
  name?: string | undefined = undefined;
  surname?: string | undefined = undefined;
  complete_name?: string | undefined = undefined;
  phonenumber?: string | undefined = undefined;
  email?: string | undefined = undefined;
  username?: string | undefined = undefined;
  bio?: string | undefined = undefined;
  image?: string | undefined = undefined;
  tocken?: string | undefined = undefined;
  birthday?: Date | undefined = undefined;
  active?: boolean | undefined = undefined;
  created?: Date | undefined = undefined;
  password?: string | undefined = undefined;
  password_hash?: string | undefined = undefined;
  profile_pic?: string | undefined = undefined;
  static CreateFrom(extendedUser: Partial<User>|null): User {
    if (!extendedUser) return null;
       const user = new User();
    Object.getOwnPropertyNames(user).forEach((key) => {
      if (key in extendedUser) {
        user[key] = extendedUser[key];
      }
    });
    return user;
  }
  static SanitiseUser(user: User): User {
    user.password ? delete user.password : null;
    user.password_hash ? delete user.password_hash : null;
    user.id ? delete user.id : null;
    return user;
  }
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
    profile_pic: {
      type: "uuid",
      default: { $db_function: "uuid()" },
    },
    password_hash: {
      type: "varchar",

      rule: {
        required: true,
      },
    },
    birthday: "timestamp",
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
    setPassword: async function (password, callback) {
      // const hashed = crypto.pbkdf2Sync(password, "salt", 100000, 512, "sha512");
      const hashed = await bcrypt.hash(password, 10);
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
