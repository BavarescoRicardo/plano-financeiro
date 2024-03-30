import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(createBudgetDto);
  }

  @Get()
  findAll() {
    return this.budgetService.findAll();
  }

  @Get(':nid')
  findOne(@Param('nid') nid: string) {
    return this.budgetService.findOne(nid);
  }

  @Delete(':nid')
  remove(@Param('nid') nid: string) {
    return this.budgetService.remove(nid);
  }
}
