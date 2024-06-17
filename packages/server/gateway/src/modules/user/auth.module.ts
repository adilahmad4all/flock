import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthResolver } from "./auth.resolver";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../../services/jwt/jwt.strategy";
import { jwtConstants } from "../../constants";
import { LoggingPlugin } from "src/services/plugins/logging";
import { MinioService } from "repositories";
import { ConfigModule } from "@nestjs/config";
import * as path from "path";
import { AppModule } from "src/app/app.module";
const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    AppModule,
    ClientsModule.register([
      {
        name: "AUTH-SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "auth-service",
            brokers: ["localhost:9092"],
          },
          consumer: {
            groupId: "auth-service",
          },
        },
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: "3600s",
      },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    LoggingPlugin,
    MinioService,
  ],
})
export class AuthModule {}
