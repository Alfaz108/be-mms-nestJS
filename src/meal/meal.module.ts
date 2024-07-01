import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { MealService } from './meal.service';

import { MealController } from './meal.controller';
import { BorderModule } from 'src/border/border.module';
import { Meal, MealSchema } from './Schemas/meal.schema';
import { BazarModule } from 'src/bazar/bazar.module';
import { SummaryModule } from 'src/summary/summary.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }]),
    BorderModule,
    BazarModule,
    SummaryModule,
  ],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {}
