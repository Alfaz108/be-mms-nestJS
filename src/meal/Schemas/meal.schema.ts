import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { STATUS_ENUM } from 'src/constant/enums/status.Enam';

export class MealChield {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Border',
    required: true,
  })
  border: mongoose.Types.ObjectId;

  @Prop({ type: Number, default: 0, required: true })
  mealQuantity: number;
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Meal {
  @Prop({ type: Date, required: true })
  mealDate: Date;

  @Prop({
    type: [MealChield],
    required: true,
  })
  meals: MealChield[];
}

export const MealSchema = SchemaFactory.createForClass(Meal);
