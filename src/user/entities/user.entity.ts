import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Budget } from 'src/budget/entities/budget.entity';
@Schema()
export class User {
  @Prop()
  nome: string;
  @Prop()
  senha: string;
  @Prop()
  email: string;
  @Prop()
  createdat: string;
  @Prop()
  updatedat: string;
  @Prop()
  idade: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Budget', default: [] })
  budgets: Budget[];
}

export const UserSchema = SchemaFactory.createForClass(User);
