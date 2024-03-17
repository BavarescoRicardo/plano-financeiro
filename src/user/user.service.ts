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

  async findBudgets(email: string) {
      const user = await this.usuarioModel.findOne({ email: email }).populate('budgets');
      return user.budgets;
    }

  update(id: number, updateUsuarioDto: UpdateUserDto) {
    console.log(updateUsuarioDto);
    return `This action updates a #${id} usuario`;
  }

  async remove(nid: string) {
    try {
      const deletedUser = await this.usuarioModel.findByIdAndDelete(nid);
      if (!deletedUser) {
        throw new NotFoundException(`Not found user .. ${nid} `);
      }
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  criptografia(senha: string) {
    return hashSync(senha, 10);
  }
}