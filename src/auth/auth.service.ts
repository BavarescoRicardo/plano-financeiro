
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(email: string, senha: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    
    if (!compareSync(senha, user.senha)) {
      throw new UnauthorizedException();
    }
    const { nome, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return user;
  }

}
