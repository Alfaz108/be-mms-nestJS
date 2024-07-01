import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Meal } from './Schemas/meal.schema';
import { BorderService } from 'src/border/border.service';
import { CreateMealDto } from './dto/create.meal.dto';
import { updateBorderDto } from 'src/border/dto/update.border.dto';
import { Border } from 'src/border/schemas/border.schema';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meal.name)
    private mealModel: mongoose.Model<Meal>,
    private readonly border: BorderService,
  ) {}

  async findByDate(date: Date): Promise<Meal[]> {
    const meals = await this.mealModel.find({ mealDate: date });
    return meals;
  }

  async findAllActiveMealBorderList(): Promise<Meal[]> {
    const allBorder = await this.border.findAll();

    const meal = await this.mealModel.find();
    return meal;
  }

  async create(
    createMealDto: CreateMealDto,
  ): Promise<{ meals: Meal[]; borders: Border[] }> {
    const foundMeals = await this.findByDate(createMealDto?.mealDate);
    if (foundMeals.length > 0) {
      throw new NotFoundException('A meal for this date already exists');
    }

    const meals: Meal[] = [];
    const borders: Border[] = [];

    for (const mealItem of createMealDto.meals) {
      const border = await this.border.findById(mealItem.border);
      if (!border) {
        throw new NotFoundException(
          `Border with id ${mealItem.border} not found`,
        );
      }

      const newMealQuantity =
        Number(mealItem?.mealQuantity) + Number(border.mealQuantity);

      const updateDto: updateBorderDto = {
        name: border.name,
        mobile: border.mobile,
        roomNumber: border.roomNumber,
        depositAmount: border.depositAmount,
        initialDepositAmount: border.initialDepositAmount,
        mealQuantity: newMealQuantity,
      };

      const updatedBorder = await this.border.updateById(
        mealItem.border,
        updateDto,
      );
      borders.push(updatedBorder);

      const newMeal = new this.mealModel({
        mealDate: createMealDto.mealDate,
        meals: [
          { mealQuantity: mealItem.mealQuantity, border: mealItem.border },
        ],
      });

      const savedMeal = await newMeal.save();
      meals.push(savedMeal);
    }

    return { meals, borders };
  }
}
