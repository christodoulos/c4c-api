import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true }) id: string;
  @Prop({ type: String, required: true, unique: true }) email: string;
  @Prop({ type: String, required: true }) name: string;
  @Prop({ type: String, required: true }) firstName: string;
  @Prop({ type: String, required: true }) lastName: string;
  @Prop({ type: String, required: true }) photoUrl: string;
  @Prop({ type: String }) category?: string;
  @Prop({ type: String, default: 'GOOGLE' }) provider: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
