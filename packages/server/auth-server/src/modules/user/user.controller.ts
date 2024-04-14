import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User,IUser, UserService } from 'repositories';

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  // TODO: Remove below listing
  @MessagePattern('users_list')
  handleGetUsers() {
    return this.userService.getAll();
  }

  @MessagePattern('get_user_by_email')
  handleGetUser(email) {
    return this.userService.getUserByEmail(email);
  }

  @MessagePattern('user_creation')
  handleUserCreation(user: IUser) {
    return this.userService.create(user);
  }

  @MessagePattern('user_update')
  handleUseUpdate(user: IUser) {
    return this.userService.update(user);
  }

  @MessagePattern('validate_user')
  handleValidateUser(user: IUser) {
    return this.userService.validateUser(user);
  }
}
