import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import {
  EmailTemplate,
  JwtPayload,
  Role,
  UserStatus,
  VerificationTokenRelationType,
  VerificationTokenType
} from 'src/global';
import { serializeUser } from 'src/serializers';
import { MailService } from '../mail/mail.service';
import { UserDocument } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { VerificationTokenService } from '../verification-token/verification-token.service';
import { SignupDto } from './dtos';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    public userService: UserService,
    private verificationTokenService: VerificationTokenService,
    private mailService: MailService,
    private jwtService: JwtService
  ) {}

  async signup({ userType, password, ...userDto }: SignupDto): Promise<any> {
    await this.userService.findByEmail(userDto.email);

    const user = await this.userService.model.create({
      userTypes: [userType],
      status: UserStatus.ACTIVE,
      role: Role.USER,
      password: await hash(password, 10),
      ...userDto
    });

    await this.sendEmailVerification(user);

    return this.generateTokens(user);
  }

  async validateUser({ sub }: JwtPayload) {
    const user = await this.userService.model.findById(sub);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, { secret: process.env.ACCESS_TOKEN_SECRET });
  }

  async generateTokens(user: UserDocument, onlyAccessToken = false) {
    const { id, refreshToken: userRefreshToken } = user;

    const generateToken = (secret: string, expiresIn: string) =>
      this.jwtService.signAsync({ sub: id }, { secret, expiresIn });

    const { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET } =
      process.env;

    const accessToken = await generateToken(ACCESS_TOKEN_SECRET!, ACCESS_TOKEN_EXPIRES_IN!);
    const refreshToken = onlyAccessToken
      ? userRefreshToken
      : await generateToken(REFRESH_TOKEN_SECRET!, REFRESH_TOKEN_EXPIRES_IN!);

    if (!onlyAccessToken) {
      await this.userService.model.findByIdAndUpdate(user.id, { refreshToken });
    }

    return { accessToken, refreshToken };
  }

  async login(data: LoginDto, adminLogin = false) {
    const user = await this.userService.findByLogin(data, adminLogin);

    return this.generateTokens(user as UserDocument);
  }

  async sendEmailVerification({ id, isEmailVerified, email, firstName }: UserDocument) {
    if (isEmailVerified) {
      throw new ConflictException('Email already verified.');
    }

    const token = await this.verificationTokenService.generateToken({
      type: VerificationTokenType.VERIFY_EMAIL,
      relationId: id,
      relationType: VerificationTokenRelationType.USER
    });

    await this.mailService.sendMail({
      to: email,
      subject: 'Confirm Email',
      data: {
        token,
        firstName
      },
      template: EmailTemplate.VERIFY_EMAIL
    });
    return { sent: true };
  }

  async logout({ _id }: UserDocument) {
    const user = await this.userService.model.findOne({ _id, refreshToken: { $ne: null } });

    if (!user) {
      throw new ConflictException('Already logged out.');
    }

    await this.userService.model.findByIdAndUpdate(_id, { refreshToken: undefined });
  }

  async verifyEmail(token: string) {
    const { relationId } = await this.verificationTokenService.verifyToken(token);

    await this.userService.model.findByIdAndUpdate(relationId, { isEmailVerified: true });

    return {
      message: 'Your email has been verified.'
    };
  }

  async getProfile({ id }: UserDocument) {
    const user = await this.userService.findByIdOrFail(id);

    return serializeUser(user);
  }

  async updateProfile(userId:string, userData: UserDocument) {
    await this.userService.updateProfile(userId,userData);
    const user  = await this.userService.findById(userId)
    return serializeUser(user);
  }
}
