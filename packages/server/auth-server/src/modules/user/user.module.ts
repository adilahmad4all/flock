import { Module } from '@nestjs/common';


import { UserController } from './user.controller';
import { UserRepository, UserService, SurrealService } from 'repositories';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    SurrealService,
    UserRepository
  ],
  exports: []
})
export class UserModule { }
