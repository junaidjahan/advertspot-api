import { BadRequestException, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, VerificationTokenType } from 'src/globals';
import { compareHash, hash, response } from 'src/globals/functions';
import { ResponseDto } from 'src/common/dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { responseUser } from 'src/common/mappers/global.mapper';
import { UserSessioDto } from './dto/user-session.dto';
import { TokenVerificationService } from '../token-verification/token-verification.service';
import { UserModel } from '../user/models/user.model';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private tokenVerificationService: TokenVerificationService,
    private mailService: MailService
  ) {}
  async signup(userDto: CreateUserDto): Promise<any> {
    const { Email, Password } = userDto;
    const userExist = await this.userRepository.find(Email);
    if (userExist.length) {
      throw new BadRequestException('This email is already in use.');
    }
    const hashedPassword = hash(Password);

    const user: CreateUserDto = (await this.userRepository.create({
      ...userDto,
      Password: hashedPassword
    })) as CreateUserDto;

    await this.sendVerificationEmail(user.id, user);

    return response({
      message: 'User created successfully',
      data: responseUser(user)
    });
  }

  async login(userData: LoginDto) {
    const [user] = await this.userRepository.find(userData.Email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordExist = compareHash(userData.Password, user.Password);
    if (!passwordExist) {
      throw new BadRequestException('Wrong password');
    }

    const JwtToken = await this.getToken({
      sub: user.id,
      email: user.Email,
      role: user.Role,
      userType: user.UserType
    });
    const resUser = responseUser(user);
    return response({
      message: 'Login successful',
      data: new UserSessioDto({ ...resUser, JwtToken })
    });
  }

  async sendVerificationEmail(Id: string, user?: UserModel) {
    if (!user) {
      user = await this.userRepository.findById(Id);
      if (user.IsEmailVerified) {
        throw new ConflictException('Email already verified.');
      }
    }

    const { Token } = await this.tokenVerificationService.generateToken(VerificationTokenType.VERIFY_EMAIL, user.id!);
    await this.mailService.sendMail({
      to: 'junaidjahan50@gmail.com',
      from: '"AdvertSpot" admin@adverspot.app',
      subject: 'Confirm Email',
      html: `Click following link to activate your account. ${process.env.URL}/auth/verify-email?token=${Token}`
    });

    return { Sent: true };
  }

  async getToken(payload: JwtPayload): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: 60 * 60 * 24 * 7,
      secret: 'jwt-secret'
    });

    return token;
  }

  async getResponse(): Promise<ResponseDto<any>> {
    console.log('In response');

    return response({
      message: 'Object created',
      data: { name: 'junaid', email: 'junaidjahan32@gmail.com' }
    });
  }
}
