import { IsEmail, MinLength } from 'class-validator';

export class CreateBudgetDto {
    @MinLength(5, { message: 'The user name should be longer than 5 letters' })
    nome: string;
    amount: number;
    category: string;
}
