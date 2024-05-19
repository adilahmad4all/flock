import { Module } from '@nestjs/common';


import { UserController } from './user.controller';
import { UserRepository, UserService, CassandraService } from 'repositories';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    CassandraService,
    UserRepository
  ],
  exports: []
})
export class UserModule { }
