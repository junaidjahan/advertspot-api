import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators';
import { UserDocument } from '../user/schemas/user.schema';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dtos';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ThrottlerBehindProxyGuard } from './guards/throttler-behind-proxy.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ThrottlerBehindProxyGuard)
  @Post('signup')
  async signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @UseGuards(ThrottlerBehindProxyGuard)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(ThrottlerBehindProxyGuard)
  @Post('admin-login')
  async adminLogin(
    @Body()
    userData: LoginDto
  ) {
    return this.authService.login(userData, true);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: UserDocument) {
    return this.authService.getProfile(user);
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @UseGuards(JwtAuthGuard)
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
