import {
  Injectable,
  Inject,
  Logger,
  OnModuleInit,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientKafka, RpcException } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import {
  User,
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
  ValidateUserInput,
  KafkaResponse,
} from "repositories";

const logger = new Logger();

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject("AUTH-SERVICE") private readonly authClient: ClientKafka,
    private jwtService: JwtService
  ) {}

  onModuleInit() {
    this.authClient.subscribeToResponseOf("users_list");
    this.authClient.subscribeToResponseOf("user_creation");
    this.authClient.subscribeToResponseOf("user_update");
    this.authClient.subscribeToResponseOf("get_user_by_email");
    this.authClient.subscribeToResponseOf("get_user_by_username");
    this.authClient.subscribeToResponseOf("validate_user");
  }

  getUsers() {
    return this.authClient
      .send("users_list", {})
      .pipe(map((users: User[]) => users));
  }

  getUser(username: string) {
    return this.authClient
      .send("get_user_by_username", username)
      .pipe(map((r_user) => r_user));
  }

  async createUser(user: CreateUserInput): Promise<void | any> {
    logger.log("GATEWAY - Create user service");

    const result:KafkaResponse<User,null> = await lastValueFrom(
      this.authClient.send("user_creation", user)
    );

    if (result.error) {
      logger.log("GATEWAY - User creation failed");
      throw new BadRequestException(result.error.message);
    }

    logger.log("GATEWAY - User created successfully");
    const token = this.jwtService.sign(result.data);
    result.data["token"] = token;
    return result.data;
  }

  updateUser(user: UpdateUserInput) {
    logger.log("GATEWAY - Update user service");

    return this.authClient.send("user_update", user).pipe(
      map((updatedUser) => {
        if (!updatedUser) {
          logger.log("GATEWAY - User not updated");
          return new RpcException("User not found");
        }

        logger.log("GATEWAY - User updated successfully");
        return updatedUser;
      })
    );
  }

  async validateUser(user: ValidateUserInput) {
    return this.authClient
      .send("validate_user", user)
      .pipe(map((validUser) => validUser));
  }

  async login(user: LoginUserInput) {
    return this.authClient.send("validate_user", user).pipe(
      map((result: KafkaResponse<User,null>) => {
        if (result.data) {
          return {
            ...result.data,
            token: this.jwtService.sign(result.data),
          };
        }
        
        throw new NotFoundException(result.error.message );
      })
    );
  }
}
