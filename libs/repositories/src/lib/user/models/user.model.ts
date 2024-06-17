import * as bcrypt from "bcrypt";
import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import {
  JoiSchema,
  JoiSchemaOptions,
  getClassSchema,
} from "joi-class-decorators";
import * as Joi from "joi";

@JoiSchemaOptions({
  allowUnknown: false,
})
export class User {
  @JoiSchema(Joi.string().guid().optional())
  id?: string | undefined = undefined;
  @JoiSchema(Joi.string().optional())
  name?: string | undefined = undefined;
  @JoiSchema(Joi.string().optional())
  surname?: string | undefined = undefined;
  @JoiSchema(Joi.string().optional())
  complete_name?: string | undefined = undefined;
  @JoiSchema(Joi.string().optional())
  phonenumber?: string | undefined = undefined;
  @JoiSchema(["INPUT-CREATE-USER"], Joi.string().email().required())
  @JoiSchema(["INPUT-LOGIN-USER"], Joi.string().email().optional())
  email?: string | undefined = undefined;
  @JoiSchema(
    ["INPUT-CREATE-USER"],
    Joi.string().alphanum().min(6).max(15).optional()
  )
  @JoiSchema(
    ["INPUT-LOGIN-USER"],
    Joi.string().alphanum().min(6).max(15).optional()
  )
  username?: string | undefined = undefined;
  @JoiSchema(Joi.string().optional())
  bio?: string | undefined = undefined;
  @JoiSchema(Joi.string().optional())
  image?: string | undefined = undefined;
  @JoiSchema(Joi.string().optional())
  tocken?: string | undefined = undefined;
  @JoiSchema(Joi.date().optional())
  birthday?: Date | undefined = undefined;
  @JoiSchema(Joi.boolean().optional())
  active?: boolean | undefined = undefined;
  @JoiSchema(Joi.date().optional())
  created?: Date | undefined = undefined;
  @JoiSchema(
    ["INPUT-CREATE-USER"],
    Joi.string().alphanum().min(6).max(15).optional()
  )
  @JoiSchema(
    ["INPUT-LOGIN-USER"],
    Joi.string().alphanum().min(6).max(15).optional()
  )
  password?: string | undefined = undefined;
  @JoiSchema(Joi.string().optional())
  password_hash?: string | undefined = undefined;
  @JoiSchema(Joi.string().optional())
  profile_pic?: string | undefined = undefined;
  static CreateFrom(extendedUser: Partial<User> | null): User {
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

@ArgsType()
@ObjectType()
export class UserApi {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  token: string;

  @Field({ nullable: true })
  profile_pic: string;

  @Field({ nullable: true })
  profile_pic_action: string;
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
function flockFileld(condition: boolean): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (condition) {
      JoiSchema(["INPUT-CREATE"], Joi.string().optional());
    }
  };
}
