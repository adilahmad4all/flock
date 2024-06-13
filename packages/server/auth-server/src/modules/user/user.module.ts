import * as path from "path";
import { Module } from "@nestjs/common";import { ConfigModule } from "@nestjs/config";

import { UserController } from "./user.controller";
import { DbOrmService, UserRepository, UserService } from "repositories";
const ENV = process.env.NODE_ENV;

@Module({
  controllers: [UserController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(
        process.cwd(),
        "config/env",
        !ENV ? ".env.local" : `.env.${ENV}`
      ),
      isGlobal: true,
    }),
  ],
  providers: [DbOrmService,UserService,  UserRepository],
  exports: [],
})
export class UserModule {}
