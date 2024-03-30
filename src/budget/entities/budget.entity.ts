import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Schema()
export class Budget extends Document {
  @Prop()
  userId: string; // Reference to the user associated with the budget

  @Prop()
  name: string; // Name of the budget

  @Prop()
  amount: number; // Total amount allocated for the budget

  @Prop()
  category: string; // Category of the budget (e.g., groceries, utilities, entertainment)

  @Prop()
  startDate: Date; // Start date of the budget period

  @Prop()
  endDate: Date; // End date of the budget period

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  movimento: [
    {
      // Array of transactions associated with the budget
      description: string;
      amount: number;
      date: Date;
    },
  ];

  @Prop()
  createdAt: Date; // Date when the budget was created

  @Prop()
  updatedAt: Date; // Date when the budget was last updated
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
