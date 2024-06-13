import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { jwtConstants } from "../../constants";
import { AuthService } from "../../modules/user/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser({ username, password });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
