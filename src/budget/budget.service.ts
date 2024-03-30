import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { Budget } from './entities/budget.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectModel(Budget.name) private budgetModel: Model<Budget>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create({ userId, ...createBudgetDto }: CreateBudgetDto) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new HttpException('Usuário não encontrado', 404);
      }

      const budget = {
        ...createBudgetDto,
        id: Date.now(),
        createDate: new Date(),
        updateDate: new Date(),
      };

      const createdBudget = new this.budgetModel(budget);
      const savedBudget = await createdBudget.save();

      // Ensure budgets field is initialized as an array if null
      if (!user.budgets) {
        user.budgets = [];
      }

      // Atualiza a lista de budgets para o usuario e em seguida salva
      user.budgets.push(savedBudget._id);
      await user.save();

      return savedBudget;
    } catch (e) {
      throw e;
    }
  }

  findAll() {
    try {
      return this.budgetModel.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(nid: string) {
    try {
      const budget = await this.budgetModel.findOne({ _id: nid });
      return budget;
    } catch (error) {
      throw error;
    }
  }

  async remove(nid: string) {
    try {
      const deletedBudget = await this.budgetModel.findByIdAndDelete(nid);
      if (!deletedBudget) {
        throw new NotFoundException(`Not found budget .. ${nid} `);
      }
      return deletedBudget;
    } catch (error) {
      throw error;
    }
  }
}
