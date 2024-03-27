
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private usuarioModel: Model<User>,
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
    const payload = { sub: user.email, username: user.nome, codigo: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = {
        ...createUserDto,
        id: Date.now(),
        senha: this.criptografia(createUserDto.senha),
        createDate: new Date(),
        updateDate: new Date(),
      };
      const createdUsuario = new this.usuarioModel(user);
      await createdUsuario.save();
      return this.signIn(createUserDto.email, createUserDto.senha);
    } catch (e) {
      throw e;
    }
  }  

  criptografia(senha: string) {
    return hashSync(senha, 10);
  }  
}
