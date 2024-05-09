import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BorderService } from 'src/border/border.service';
import { Summary } from './Schemas/summary.schema';
import { BazarService } from 'src/bazar/bazar.service';

@Injectable()
export class SummaryService {
  constructor(
    @InjectModel(Summary.name)
    private summaryModel: mongoose.Model<Summary>,
    private readonly border: BorderService,
    private readonly bazar: BazarService,
  ) {}

  async findAll(): Promise<any[]> {
    const borders = await this.border.findAll();
    const bazars = await this.bazar.findAll();

    if (!borders) {
      throw new NotFoundException('Border not found');
    }

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
    const alfaz = [];

    for (const [index, singleBorder] of borders.entries()) {
      const totalCost = mealRate * singleBorder.mealQuantity || 0;
      const summaryAmount = singleBorder.depositAmount - totalCost;

      console.log(singleBorder);

      alfaz.push({
        border: singleBorder,
        mealRate: mealRate,
        totalMeal: singleBorder.mealQuantity,
        depositAmount: singleBorder.depositAmount,
        costAmount: totalCost,
        summaryAmount: summaryAmount,
      });
    }

    return alfaz;
  }
}
