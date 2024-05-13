import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Border } from './schemas/border.schema';
import { createBorderDto } from './dto/create.border.dto';
import { updateBorderDto } from './dto/update.border.dto';
import { BazarService } from 'src/bazar/bazar.service';
import { SummaryService } from 'src/summary/summary.service';
import { Summary } from 'src/summary/Schemas/summary.schema';
import { CreateSummaryDto } from 'src/summary/dto/create.summary.dto';

@Injectable()
export class BorderService {
  constructor(
    @InjectModel(Border.name)
    private borderModel: mongoose.Model<Border>,
    private readonly bazar: BazarService,
    private readonly summary: SummaryService,
  ) {}
  async findAll(): Promise<Border[]> {
    const border = await this.borderModel.find();
    return border;
  }

  async create(
    border: createBorderDto,
  ): Promise<{ border: Border; summary: Summary }> {
    const bazars = await this.bazar.findAll();
    const borders = await this.borderModel.find();

    let totalMeal = 0;
    let totalBazar = 0;

    for (const singleBorder of borders) {
      totalMeal += singleBorder?.mealQuantity;
    }

    if (bazars) {
      for (const singleBazar of bazars) {
        totalBazar += singleBazar?.totalPrice;
      }
    }

    const mealRate = totalMeal > 0 ? totalBazar / totalMeal : 0;

    let borderSummaryAdd = {
      name: border?.name,
      mobile: border?.mobile,
      email: border?.email,
      initialDepositAmount: border?.initialDepositAmount,
      depositAmount: border?.depositAmount,
      mealQuantity: border?.mealQuantity,
      roomNumber: border?.roomNumber,
      status: border?.status,
      mealRate: mealRate,
      totalCost: 0,
      summaryAmount: border?.depositAmount,
    };

    const createdBorder = await this.borderModel.create(borderSummaryAdd);

    let summaryAdd = {
      border: createdBorder?._id,
      depositAmount: border?.depositAmount,
      mealQuantity: border?.mealQuantity,
      mealRate: mealRate,
      totalCost: 0,
      summaryAmount: border?.depositAmount,
    };
    const createdSummary = await this.summary.create(summaryAdd);

    return { border: createdBorder, summary: createdSummary };
  }

  async findById(id: mongoose.Types.ObjectId): Promise<Border> {
    const border = await this.borderModel.findById(id);
    return border;
  }

  async updateById(
    id: mongoose.Types.ObjectId,
    border: updateBorderDto,
  ): Promise<Border> {
    return await this.borderModel.findByIdAndUpdate(id, border, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Border> {
    return await this.borderModel.findByIdAndDelete(id);
  }
}
