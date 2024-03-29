import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Budget, BudgetSchema } from 'src/budget/entities/budget.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Budget.name, schema: BudgetSchema }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService],
})
export class UserModule {}