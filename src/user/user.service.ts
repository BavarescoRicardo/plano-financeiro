import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private usuarioModel: Model<User>,
  ) {}
  
  create(createUserDto: CreateUserDto) {
    try {
      const user = {
        ...createUserDto,
        id: Date.now(),
        senha: this.criptografia(createUserDto.senha),
        createDate: new Date(),
        updateDate: new Date(),
      };
      const createdUsuario = new this.usuarioModel(user);
      return createdUsuario.save();
    } catch (e) {
      throw e;
    }
  }

  findAll() {
    try {
      return this.usuarioModel.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(email: string) {
    try {
      return await this.usuarioModel.findOne({ email: email });
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUsuarioDto: UpdateUserDto) {
    console.log(updateUsuarioDto);
    return `This action updates a #${id} usuario`;
  }

  async remove(nid: string) {
    try {
      const deletedBudget = await this.usuarioModel.findByIdAndDelete(nid);
      if (!deletedBudget) {
        throw new NotFoundException(`Not found budget .. ${nid} `);
      }
      return deletedBudget;
    } catch (error) {
      throw error;
    }
  }

  criptografia(senha: string) {
    return hashSync(senha, 10);
  }
}