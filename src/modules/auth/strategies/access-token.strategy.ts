import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/global';
import { AuthService } from '../auth.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token') {
  constructor(private readonly authSrv: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authSrv.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
