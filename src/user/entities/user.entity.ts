import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsuarioDocumento = HydratedDocument<User>;

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
}

export const UserSchema = SchemaFactory.createForClass(User);