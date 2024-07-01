import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Deposit {
  @Prop({ type: Date, required: true })
  dipositDate: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Border',
    required: true,
  })
  border: mongoose.Types.ObjectId;

  @Prop({ type: Number, default: 0, required: true })
  depositAmount: number;
}

export const DepositSchema = SchemaFactory.createForClass(Deposit);
