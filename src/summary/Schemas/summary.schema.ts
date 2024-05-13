import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { STATUS_ENUM } from 'src/constant/enums/status.Enam';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Summary extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Border',
    required: true,
  })
  border: mongoose.Types.ObjectId;

  @Prop({ type: Number, default: 0, required: true })
  mealRate: number;

  @Prop({ type: Number, default: 0, required: true })
  mealQuantity: number;

  @Prop({ type: Number, default: 0, required: true })
  depositAmount: number;

  @Prop({ type: Number, default: 0, required: true })
  totalCost: number;

  @Prop({ type: Number, default: 0, required: true })
  summaryAmount: number;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
