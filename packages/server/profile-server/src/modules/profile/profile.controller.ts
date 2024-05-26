import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProfileService } from '@ithub/repositories';

@Controller()
export class ProfileController {

  constructor(
    private profileService: ProfileService
  ) { }

  @MessagePattern('profile_get')
  handleGetProfile(profileArgs) {
    return this.profileService.getProfile(profileArgs.username, profileArgs.currentUserEmail);
  }

  @MessagePattern('follow')
  handleFollow(payload) {
    return this.profileService.follow(payload);
  }

  @MessagePattern('unfollow')
  handleUnFollow(payload) {
    return this.profileService.unfollow(payload);
  }
}
