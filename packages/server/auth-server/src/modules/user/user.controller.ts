import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { User, UserService } from "repositories";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO: Remove below listing
  @MessagePattern("users_list")
  async handleGetUsers() {
    return JSON.stringify(this.userService.getAll());
  }

  @MessagePattern("get_user_by_email")
  async handleGetUser(username) {
    return JSON.stringify(this.userService.getUserByUsername(username));
  }
  @MessagePattern("get_user_by_username")
  async handleGetUserbyUsername(username) {
    return JSON.stringify(await this.userService.getUserByUsername(username));
  }

  @MessagePattern("user_creation")
  async handleUserCreation(user: User) {
    return JSON.stringify(await this.userService.create(user));
  }

  @MessagePattern("user_update")
  async handleUseUpdate(user: User) {
    return JSON.stringify(await this.userService.update(user));
  }

  @MessagePattern("validate_user")
  async handleValidateUser(user: User) {
    return JSON.stringify(await this.userService.validateUser(user));
  }
}
