import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MealService } from './meal.service';
import { Meal } from './Schemas/meal.schema';
import { CreateMealDto } from './dto/create.meal.dto';
@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  // GET all bazars
  @Get('/active')
  @UseGuards(AuthGuard())
  async getAllActiveMealBorderList(): Promise<Meal[]> {
    return this.mealService.findAllActiveMealBorderList();
  }

  // // POST a new bazar
  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() meal: CreateMealDto) {
    try {
      const data = await this.mealService.create(meal);
      return {
        data,
        message: 'meal created successfully',
      };
    } catch (error) {
      return {
        error: error.message,
        message: 'meal created failed',
      };
    }
  }

  // // GET a bazar by ID
  // @Get(':id')
  // @UseGuards(AuthGuard())
  // async getBazar(@Param('id') id: string): Promise<Bazar> {
  //   return this.depositService.findById(id);
  // }

  // // // PUT update a bazar by ID
  // @Put(':id')
  // @UseGuards(AuthGuard())
  // async updateBazar(@Param('id') id: string, @Body() bazar: updateBazarDto) {
  //   try {
  //     const data = await this.depositService.updateById(id, bazar);
  //     return {
  //       data,
  //       message: 'bazar update successfully',
  //     };
  //   } catch (error) {
  //     return {
  //       error: error.message,
  //       message: 'bazar update failed',
  //     };
  //   }
  // }

  // // // DELETE a bazar by ID
  // @Delete(':id')
  // @UseGuards(AuthGuard())
  // async deleteBazar(@Param('id') id: string) {
  //   try {
  //     const data = await this.depositService.deleteById(id);
  //     return {
  //       data,
  //       message: 'bazar delete successfully',
  //     };
  //   } catch (error) {
  //     return {
  //       error: error.message,
  //       message: 'bazar delete failed',
  //     };
  //   }
  // }
}
