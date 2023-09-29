import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() values: LoginDto) {
    return await this.authService.signIn(values.login, values.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
