import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { STATUS_ENUM } from 'src/constant/enums/status.Enam';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Border {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  mobile: string;

  @Prop({ type: String })
  email?: string;

  @Prop({ type: String, required: true })
  roomNumber: string;

  @Prop({ type: String, enum: STATUS_ENUM, required: true })
  status: STATUS_ENUM;
}

export const BorderSchema = SchemaFactory.createForClass(Border);