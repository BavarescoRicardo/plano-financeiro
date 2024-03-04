import { Injectable } from '@nestjs/common';
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
    return `This action returns all budget`;
  }

  findOne(id: number) {
    return `This action returns a #${id} budget`;
  }

  update(id: number, updateBudgetDto: UpdateBudgetDto) {
    return `This action updates a #${id} budget`;
  }

  remove(id: number) {
    return `This action removes a #${id} budget`;
  }
}
