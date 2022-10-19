import { SetMetadata } from '@nestjs/common';
import { Role, UserType } from 'src/global';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Array<UserType | Role>) => SetMetadata(ROLES_KEY, roles);
