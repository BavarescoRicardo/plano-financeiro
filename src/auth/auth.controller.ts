
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginUserDto) {
    return this.authService.signIn(loginDto.email, loginDto.senha);
  }
}
