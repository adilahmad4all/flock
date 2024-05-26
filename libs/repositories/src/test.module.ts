import { Module } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './lib/auth/services/user.service';
import { UserRepository } from './lib/auth/user.repository';
import { DbOrmService } from './lib/service/dbOrm.service';
import { CassandraService } from './lib/service/database.service';


@Controller()
export class TestController {






 }


@Module({
  
  providers: [DbOrmService,UserRepository,UserService,CassandraService],
  controllers: [TestController]
})
export class TestModule { }







