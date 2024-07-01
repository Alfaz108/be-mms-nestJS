import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose'; // Import mongoose without destructuring
import { Border } from 'src/border/schemas/border.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Bazar {
  @Prop({ type: Date, required: true })
  bazarDate: Date;

  @Prop({ type: Number, default: 0, required: true })
  totalPrice: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Border',
    required: true,
  })
  border: mongoose.Types.ObjectId;
}

export const BazarSchema = SchemaFactory.createForClass(Bazar);
