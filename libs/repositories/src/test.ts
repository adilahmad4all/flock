import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { TestModule } from "./test.module";
import { UserService } from "./lib/user/user.service";
import { User } from "./lib/user/models/user.model";

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(TestModule);

  logger.log("stories-server is listening");
  await app.init();
  const userservice = app.select(TestModule).get(UserService);

  const userValue = {
    email: "asasdfgfd",
    username: "dsdfgmousername",
    password: "parayula",
    bio: "",
    image: "/random",
    tocken: "tocken",
  };
  let user = new User();
  setTimeout(() => {
    userservice.create(user);
  }, 10000);
}

bootstrap();
