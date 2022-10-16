import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CurrentUser, Role } from 'src/global';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class WsRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Array<Role>>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    if (!roles) {
      return true;
    }

    const { _user } = context.switchToWs().getData() as { _user?: CurrentUser };

    return roles.some(role => _user?.role === role);
  }
}
