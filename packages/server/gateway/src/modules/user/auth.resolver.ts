import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import {
  User,
  CreateUserInput,
  UpdateUserInput,
  UpdatedUserOutput,
  GetUserInput,
  CreateUserOutput,
  LoginUserOutput,
  LoginUserInput,
} from "repositories";

import { UseGuards } from "@nestjs/common";

import { GraphQLAuthGuard } from "../../services/jwt/jwt-auth.guard";
import { MinioService } from "src/services/minio.service";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private minioService: MinioService
  ) {}

  @Query(() => [User])
  @UseGuards(GraphQLAuthGuard)
  users() {
    return this.authService.getUsers();
  }

  @Query(() => User)
  @UseGuards(GraphQLAuthGuard)
  getUser(@Args("email") email: string) {
    return this.authService.getUser(email);
  }

  @Mutation(() => CreateUserOutput)
  async createUser(@Args("user") user: CreateUserInput) {
    const res = await this.authService.createUser(user);
    if(res){
    res.profile_pic_action = this.minioService.presignedPutObject(
      "profile",
      res.profile_pic,
      60 * 60
    );
  }
    return this.authService.createUser(user);
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
