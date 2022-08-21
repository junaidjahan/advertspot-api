import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UserRepository } from '../user/user.repository';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signup(email: string, password: string) {
    const user = await this.userRepository.find(email);
    if (user.length) {
      throw new BadRequestException('This email is already in use.');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
  }

  async login(email: string, password: string) {
    const [user] = await this.userRepository.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.Password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong password');
    }

    return user;
  }

  async token(id: string, email: string) {
    const token = this.getToken(id, email);
    return token;
  }

  async getToken(id: string, email: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      { sub: id, email },
      { expiresIn: 60 * 60 * 24 * 7, secret: 'jwt-secret' },
    );

    return token;
  }
}
