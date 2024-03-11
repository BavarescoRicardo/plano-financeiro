
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    senha: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (!compareSync(senha, user.senha)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.nome };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
