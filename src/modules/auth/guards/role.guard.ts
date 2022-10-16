import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/global';
import { UserDocument } from 'src/modules/user/schemas/user.schema';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
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

    const { user } = context.switchToHttp().getRequest() as { user?: UserDocument };

    return roles.some(role => user?.role === role);
  }
}
