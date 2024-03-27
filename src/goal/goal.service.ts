import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Goal } from './entities/goal.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectModel(Goal.name) private goalModel: Model<Goal>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create({ userId, ...createGoalDto}: CreateGoalDto) {
    try {
      const user = this.userModel.findById(userId);
      if(!user){
        throw new HttpException("Usuário não encontrado", 404);
      }

      const goal = {
        ...createGoalDto,
        id: Date.now(),
        createDate: new Date(),
        updateDate: new Date(),
      };
      const createdGoal = new this.goalModel(goal);
      const savedGoal = createdGoal.save();
      await user.updateOne({ $push: {
        goals: (await savedGoal)._id
      }})

      return savedGoal;
    } catch (e) {
      throw e;
    }
  }

  findAll() {
    try {
      return this.goalModel.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(nid: string) {
    try {
      const goal = await this.goalModel.findOne({ _id:  nid})
      return goal;
    } catch (error) {
      throw error;
    }
  }
  update(id: number, updateGoalDto: UpdateGoalDto) {
    return `This action updates a #${id} goal`;
  }

  async remove(nid: string) {
    try {
      const deletedGoal = await this.goalModel.findByIdAndDelete(nid);
      if (!deletedGoal) {
        throw new NotFoundException(`Not found goal .. ${nid} `);
      }
      return deletedGoal;
    } catch (error) {
      throw error;
    }
  }
}
