import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { MealService } from './meal.service';

import { MealController } from './meal.controller';
import { BorderModule } from 'src/border/border.module';
import { Meal, MealSchema } from './Schemas/meal.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }]),
    BorderModule,
  ],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
