import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_KEY')
        };
      },
      inject: [ConfigService]
    }),
    ConfigModule,
    PassportModule,
    UserModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5
    })
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
