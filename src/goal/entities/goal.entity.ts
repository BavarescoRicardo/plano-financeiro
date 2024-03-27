import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Schema()
export class Goal extends Document {

  @Prop()
  descricao: string; 

  @Prop()
  previsao: Date; 

  @Prop()
  valor: number; 

  @Prop()
  imagem: string; 

  @Prop()
  aportes: number[]; 

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;  

  @Prop()
  movimento: [{ 
    description: string;
    amount: number;
    date: Date;
  }];

  @Prop()
  createdAt: Date; 

  @Prop()
  updatedAt: Date; 
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
