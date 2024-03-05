import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BudgetService {
  constructor(
    @InjectModel(Budget.name) private budgetModel: Model<Budget>,
  ) {}

  create(createBudgetDto: CreateBudgetDto) {
    try {
      const budget = {
        ...createBudgetDto,
        id: Date.now(),
        createDate: new Date(),
        updateDate: new Date(),
      };
      const createdBudget = new this.budgetModel(budget);
      return createdBudget.save();
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

  async findOne(name: string) {
    try {
      return await this.budgetModel.findOne({ name: name });
    } catch (error) {
      throw error;
    }
  }
  update(id: number, updateBudgetDto: UpdateBudgetDto) {
    return `This action updates a #${id} budget`;
  }

  async remove(name: string) {
    try {
      const deletedBudget = await this.budgetModel.findOneAndDelete({ name: name });
      if (!deletedBudget) {
        throw new NotFoundException(`Not found budget .. ${name} `);
      }
      return deletedBudget;
    } catch (error) {
      throw error;
    }
  }
}
