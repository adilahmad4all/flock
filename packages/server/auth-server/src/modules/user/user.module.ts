import { Module } from '@nestjs/common';


import { UserController } from './user.controller';
import { UserRepository, UserService } from 'repositories';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    ,
    UserRepository
  ],
  exports: []
})
export class UserModule { }
