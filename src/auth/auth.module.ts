
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    UserModule,    
    JwtModule.register({
      global: true,
      // secret: jwtConstants.secret,
      secret: "codigoSecretoSubstituirEnvyy",
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ])
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
