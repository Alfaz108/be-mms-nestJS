import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Manager {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  mobile: string;

  @Prop({ type: String })
  email?: string;

  @Prop({ type: String })
  roomNumber: string;

  @Prop({ type: String, required: true })
  month: Date;

  @Prop({ type: String, required: true })
  password: string;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
