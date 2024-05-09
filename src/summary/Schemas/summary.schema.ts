import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { STATUS_ENUM } from 'src/constant/enums/status.Enam';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Summary {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Border',
    required: true,
  })
  border: mongoose.Types.ObjectId;

  @Prop({ type: Number, default: 0, required: true })
  mealRate: number;

  @Prop({ type: Number, default: 0, required: true })
  totalMeal: number;

  @Prop({ type: Number, default: 0, required: true })
  depositAmount: number;

  @Prop({ type: Number, default: 0, required: true })
  costAmount: number;

  @Prop({ type: Number, default: 0, required: true })
  summaryAmount: number;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
