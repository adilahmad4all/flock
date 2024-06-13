import { Module } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { UserService } from "./lib/user/user.service";
import { UserRepository } from "./lib/user/user.repository";
import { DbOrmService } from "./lib/service/dbOrm.service";

import { ConfigModule } from "@nestjs/config";
import path from "path";

@Controller()
export class TestController {}

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(
        process.cwd(),
        "config/env",
        !ENV ? ".env" : `.env.${ENV}`
      ),
      isGlobal: true,
    }),
  ],
  providers: [DbOrmService, UserRepository, UserService],
  controllers: [TestController],
})
export class TestModule {}
