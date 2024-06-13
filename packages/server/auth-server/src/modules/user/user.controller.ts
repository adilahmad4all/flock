import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { User, UserService } from "repositories";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO: Remove below listing
  @MessagePattern("users_list")
  handleGetUsers() {
    return this.userService.getAll();
  }

  @MessagePattern("get_user_by_email")
  handleGetUser(username) {
    return this.userService.getUserByUsername(username);
  }
  @MessagePattern("get_user_by_username")
  handleGetUserbyUsername(username) {
    return this.userService.getUserByUsername(username);
  }

  @MessagePattern("user_creation")
  async handleUserCreation(user: User) {
      return await this.userService.create(user);
    
  }

  @MessagePattern("user_update")
  handleUseUpdate(user: User) {
    return this.userService.update(user);
  }

  @MessagePattern("validate_user")
  async handleValidateUser(user: User) {
    return await this.userService.validateUser(user);
  }
}
