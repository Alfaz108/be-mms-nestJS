import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

enum STATUS_ENUM {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
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

  @Prop({ type: Number, default: 0, required: true })
  initialDepositAmount: number;

  @Prop({ type: Number, default: 0, required: true })
  depositAmount: number;

  @Prop({ type: Number, default: 0, required: true })
  mealQuantity: number;

  @Prop({ type: Number, default: 0, required: true })
  mealRate: number;

  @Prop({ type: Number, default: 0, required: true })
  totalCost: number;

  @Prop({ type: Number, default: 0, required: true })
  summaryAmount: number;

  @Prop({ type: String, enum: STATUS_ENUM, required: true })
  status: STATUS_ENUM;
}

export const BorderSchema = SchemaFactory.createForClass(Border);
