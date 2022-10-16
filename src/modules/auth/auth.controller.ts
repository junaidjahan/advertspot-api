import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators';
import { UserDocument } from '../user/schemas/user.schema';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dtos';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('send-email-verification')
  async sendEmailVerification(@CurrentUser() user: UserDocument) {
    return this.authService.sendEmailVerification(user);
  }

  @Post('refresh-access-token')
  @UseGuards(AuthGuard('refresh-token'))
  async refreshAccessToken(@CurrentUser() user: UserDocument) {
    return this.authService.generateTokens(user, true);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@CurrentUser() user: UserDocument) {
    return this.authService.logout(user);
  }
}
