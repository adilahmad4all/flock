import { Injectable, Logger } from "@nestjs/common";
import { User } from "./models/user.model";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcrypt";
import { KafkaResponse } from "../common/response";

const logger = new Logger();

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll() {
    const result = new KafkaResponse();
    logger.log("AUTH-SERVICE - Getting Users");
    result.data = await this.userRepository.getUsers();
    return result;
  }

  async getUserByUsername(
    username: string
  ): Promise<KafkaResponse<User, null>> {
    const result = new KafkaResponse<User, null>();
    logger.log("AUTH-SERVICE: FindUser triggered");
    const found_user = await this.userRepository.getUserByUsername(username);

    if (found_user) {
      logger.log("AUTH-SERVICE - User found");
      result.data = User.SanitiseUser(found_user);
    } else {
      logger.log("AUTH-SERVICE - User not found");
      result.error = {
        message: "User not found",
        code: "404",
      };
    }

    return result;
  }

  async create(user: User): Promise<KafkaResponse<User, null>> {
    const result = new KafkaResponse<User, null>();
    logger.log("AUTH-SERVICE - Create User triggered");
    const existing_email = await this.userRepository.getUserByEmail(user.email);
    const existing_username = await this.userRepository.getUserByUsername(
      user.username
    );

    if (existing_email || existing_username) {
      logger.log("AUTH-SERVICE - Email or Username already taken");
      result.error = {
        message: "Email or Username already taken",
        code: "400",
      };
    } else {
      const save_user = await this.userRepository.createUser(user);
      if (save_user) {
        const new_user = await this.userRepository.getUserByUsername(
          user.username
        );
        result.data = User.SanitiseUser(new_user);
      }
    }
    return result;
  }

  async update(user: User): Promise<KafkaResponse<User, null>> {
    const result = new KafkaResponse<User, null>();
    logger.log("AUTH-SERVICE - Updating User");
    const currentUser = await this.getUserByUsername(user.username);

    if (currentUser) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      await this.userRepository.updateUser(user);

      const updatedUser = await this.userRepository.getUserByUsername(
        user.username
      );
      result.data = User.SanitiseUser(updatedUser);
    }
    return result;
  }

  async validateUser(user: User): Promise<KafkaResponse<User, null>> {
    const result = new KafkaResponse<User, null>();
    logger.log("AUTH-SERVICE - Validating User");

    const found_user = await this.userRepository.getUserByUsername(
      user.username
    );
    if (found_user) {
      const isPasswordOk = await bcrypt.compare(
        user.password,
        found_user.password_hash
      );

      if (isPasswordOk) {
        logger.log("AUTH-SERVICE - Login Successful");
        result.data = User.SanitiseUser(found_user);
      }
    } else {
      logger.log("AUTH-SERVICE - Invalid Failed");
      result.error = {
        message: "User not found",
        code: "404",
      };
    }

    return result;
  }
}
