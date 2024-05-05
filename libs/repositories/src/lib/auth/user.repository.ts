import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { User } from './models/user.model';
import { CassandraService } from '../service/database.service';
@Injectable()
export class UserRepository implements OnModuleInit {

  constructor(private cassandraService: CassandraService) { }

  userMapper: mapping.ModelMapper<User>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        'User': {
          tables: ['users'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings
        }
      }
    }

    this.userMapper = this.cassandraService.createMapper(mappingOptions).forModel('User');
  }

  async getUsers() {
    return (await this.userMapper.findAll()).toArray();
  }

  async getUserByEmail(email: string) {
    return await (await this.userMapper.find({ email })).first();
  }

  async getUserByUsername(username: string) {
    const res = await this.cassandraService.client.execute(`SELECT * FROM users WHERE username = '${username}' ALLOW FILTERING`);
    if (res?.rows?.length) {
      return true;
    }

    return false;
  }

  createUser(user: User) {
    return this.userMapper.insert(user);
  }

  updateUser(user: User) {
    return this.userMapper.update(user);
  }
}