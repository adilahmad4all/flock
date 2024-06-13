import { DbOrmService } from 'repositories;
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import {
  FollowerService,
  ProfileRepository,
  ProfileService,
  FollowerRepository
} from 'repositories';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileRepository,
    FollowerRepository,
    FollowerService,
   
  ],
})
export class ProfileModule { }
