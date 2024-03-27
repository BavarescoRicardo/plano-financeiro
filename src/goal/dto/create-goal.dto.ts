import { MinLength, IsNotEmpty } from "class-validator";

export class CreateGoalDto {
    @MinLength(5, { message: 'The Goal name should be longer than 5 letters' })
    descricao: string;
    @IsNotEmpty()
    previsao: Date; 
    @IsNotEmpty()
    valor: number; 
    @IsNotEmpty()
    imagem: string;

    @IsNotEmpty()
    userId: string;
}
