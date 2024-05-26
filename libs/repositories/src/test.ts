import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { TestModule } from './test.module';
import { UserService } from './lib/auth/services/user.service';
import { User } from './lib/auth/models/user.model';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(TestModule)

  logger.log("stories-server is listening");
  await app.init();
  const userservice = app.select(TestModule).get(UserService);
  let user = new User();
  user ={
    email: "asasdfgfd",
    username: "dsdfgmousername",
    password: "parayula",
    bio: "",
    image: "/random" ,
    tocken: "tocken"
  }
  setTimeout(()=>{userservice.create( user);},10000)
  
}

bootstrap();
