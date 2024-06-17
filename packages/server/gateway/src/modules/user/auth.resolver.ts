import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import {
  UserApi,
  CreateUserInput,
  UpdateUserInput,
  UpdatedUserOutput,
  LoginUserOutput,
  LoginUserInput,
  CreateUserResponse,
  MinioService,
} from "repositories";

import { UseGuards } from "@nestjs/common";

import { GraphQLAuthGuard } from "../../services/jwt/jwt-auth.guard";


@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private minioService: MinioService
  ) {}

  @Query(() => [UserApi])
  @UseGuards(GraphQLAuthGuard)
  users() {
    return this.authService.getUsers();
  }

  @Query(() => UserApi)
  @UseGuards(GraphQLAuthGuard)
  getUser(@Args("email") email: string) {
    return this.authService.getUser(email);
  }

  @Mutation(() => CreateUserResponse)
  async createUser(@Args("user") user: CreateUserInput) {
    const res = new CreateUserResponse();
    res.data = await this.authService.createUser(user);
    if (res) {
      res.action = {
        profile_pic_action: await this.minioService.presignedPutObject(
          "profile",
          res.data.profile_pic,
          60 * 60
        ),
      };
    }
    return res;
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => UpdatedUserOutput)
  updateUser(@Args("user") user: UpdateUserInput) {
    return this.authService.updateUser(user);
  }

  @Query(() => LoginUserOutput)
  loginUser(@Args("user") user: LoginUserInput) {
    return this.authService.login(user);
  }
}
