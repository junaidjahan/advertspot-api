import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { Role, UserStatus } from 'src/global';
import { BaseService } from 'src/shared';
import { LoginDto } from '../auth/dtos';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService extends BaseService(User) {
  async findByEmail(email: string) {
    const user = await this.model.findOne({ email });

    if (user) {
      throw new ConflictException(`User with same email already exists.`);
    }

    return user;
  }

  async findById(id: string) {
    const user = await this.model.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByLogin({ email, password }: LoginDto, adminLogin = false) {
    const user = await this.model.findOne({ email, role: adminLogin ? Role.ADMIN : Role.USER });

    if (!user) {
      throw new UnauthorizedException('Email not found.');
    } else if (user.status !== UserStatus.ACTIVE) {
      throw new ForbiddenException('User is not active.');
    } else if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('Password is wrong.');
    }

    return user;
  }

  async getAll() {
    const users = await this.model.find();
    return users;
  }
}
