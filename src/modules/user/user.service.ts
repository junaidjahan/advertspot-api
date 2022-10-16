import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { Model } from 'mongoose';
import { CurrentUser, Role, UserStatus } from 'src/global';
import { LoginDto } from '../auth/dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) public userModel: Model<UserDocument>) {}

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new ConflictException(`User with same email already exists.`);
    }

    return user;
  }

  async findByLogin({ email, password }: LoginDto, adminLogin = false): Promise<CurrentUser> {
    const user = await this.userModel.findOne({ email, role: adminLogin ? Role.ADMIN : Role.USER });

    if (!user) {
      throw new UnauthorizedException('Email not found.');
    } else if (user.status !== UserStatus.ACTIVE) {
      throw new ForbiddenException('User is not active.');
    } else if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('Password is wrong.');
    }

    return user;
  }
}
