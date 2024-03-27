import { PartialType } from '@nestjs/mapped-types';
import { CreateGoalDto } from './create-goal.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateGoalDto extends PartialType(CreateGoalDto) {
    @IsNotEmpty()
    data: Date; 
    @IsNotEmpty()
    valorAporte: number; 

    @IsNotEmpty()
    userId: string;
}
