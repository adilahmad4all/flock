import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLAuthGuard } from "../../services/jwt/jwt-auth.guard";
import { Profile, FollowInput, GetProfileInput } from "repositories";

import { ProfileService } from "./profile.service";

@Resolver()
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @Query(() => Profile)
  @UseGuards(GraphQLAuthGuard)
  getProfile(@Args("profileArgs") profileArgs: GetProfileInput) {
    return this.profileService.getProfile(profileArgs);
  }

  @Mutation(() => String)
  @UseGuards(GraphQLAuthGuard)
  follow(@Args("followArgs") followArgs: FollowInput) {
    return this.profileService.follow(followArgs);
  }

  @Mutation(() => String)
  @UseGuards(GraphQLAuthGuard)
  unfollow(@Args("unfollowArgs") unfollowArgs: FollowInput) {
    return this.profileService.unFollow(unfollowArgs);
  }
}
