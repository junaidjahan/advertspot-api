import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { TokenVerificationModule } from '../token-verification/token-verification.module';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({}),
    TokenVerificationModule,
    MailModule,
  ],
})
export class AuthModule {}
