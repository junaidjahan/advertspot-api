import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/globals/constants';

export class JwtAuthGuard extends AuthGuard('jwt') {
  public reflector: Reflector;
  constructor() {
    super();
    this.reflector = new Reflector();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) {
      try {
        await super.canActivate(context);
      } catch {}
      return true;
    }
    return super.canActivate(context);
  }
}
