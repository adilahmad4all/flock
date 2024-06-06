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

import { GraphQLAuthGuard } from "../../shared/jwt/jwt-auth.guard";


@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Query(() => [User])
  @UseGuards(GraphQLAuthGuard)
  users() {
    return this.authService.getUsers();
  }

  @Query(() => User)
  @UseGuards(GraphQLAuthGuard)
  getUser(@Args('email') email: string) {
    return this.authService.getUser(email);
  }

  @Mutation(() => CreateUserOutput)
  createUser(@Args('user') user: CreateUserInput) {
    return this.authService.createUser(user);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => UpdatedUserOutput)
  updateUser(@Args('user') user: UpdateUserInput) {
    return this.authService.updateUser(user);
  }

  @Query(() => LoginUserOutput)
  loginUser(@Args('user') user: LoginUserInput) {
    return this.authService.login(user);
  }
}