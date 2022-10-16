import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CurrentUser, JwtPayload } from 'src/global';
import { UserDocument } from 'src/modules/user/schemas/user.schema';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
  constructor(private moduleRef: ModuleRef) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('RefreshToken'),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true
    });
  }

  async validate(request: Request, payload: JwtPayload): Promise<Partial<CurrentUser>> {
    const contextId = ContextIdFactory.getByRequest(request);
    const authSrv = await this.moduleRef.resolve(AuthService, contextId);

    const { refreshToken } = request.body;

    const { refreshToken: userRefreshToken, id } = await authSrv.validateUser(payload);

    if (userRefreshToken && refreshToken) {
      if (refreshToken !== userRefreshToken) {
        throw new UnauthorizedException('Refresh Token is malformed.');
      }

      return { id, refreshToken } as UserDocument;
    }
    throw new UnauthorizedException('Invalid token');
  }
}
