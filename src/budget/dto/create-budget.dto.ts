import { MinLength, IsNotEmpty } from 'class-validator';

export class CreateBudgetDto {
  @MinLength(5, { message: 'The budget name should be longer than 5 letters' })
  name: string;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  userId: string;
}
