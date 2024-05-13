import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Deposit } from './Schemas/deposit.schema';
import { createDepositDto } from './dto/create.deposit.dto';
import { Border } from 'src/border/schemas/border.schema';
import { BorderService } from 'src/border/border.service';
import { updateBorderDto } from 'src/border/dto/update.border.dto';
import { UpdateSummaryDto } from 'src/summary/dto/update.summary.dto copy';
import { SummaryService } from 'src/summary/summary.service';
import { Summary } from 'src/summary/Schemas/summary.schema';

@Injectable()
export class DepositService {
  constructor(
    @InjectModel(Deposit.name)
    private depositModel: mongoose.Model<Deposit>,
    private readonly border: BorderService,
    private readonly summary: SummaryService,
  ) {}

  async findAll(): Promise<Deposit[]> {
    const deposit = await this.depositModel.find();
    return deposit;
  }
  async create(
    deposit: createDepositDto,
  ): Promise<{ deposit: Deposit; border: Border; summary: Summary }> {
    const border = await this.border.findById(deposit?.border);
    if (!border) {
      throw new NotFoundException('Border not found');
    }

    const newDepositAmount =
      Number(deposit?.depositAmount) + Number(border?.depositAmount);

    const createdDeposit = await this.depositModel.create(deposit);

    const summary = await this.summary.findByBorderId(createdDeposit?.border);

    const newSummaryAmount =
      Number(deposit?.depositAmount) + Number(summary?.summaryAmount);

    const summaryUpdateDto = {
      border: summary?.border,
      mealRate: summary?.mealRate,
      mealQuantity: summary?.mealQuantity,
      totalCost: summary?.totalCost,
      depositAmount: newDepositAmount,
      summaryAmount: newSummaryAmount,
    };

    console.log({ summaryUpdateDto });
    const summaryUpdate = await this.summary.updateById(
      summary?._id,
      summaryUpdateDto,
    );

    const updateBorderDto = {
      name: border.name,
      mobile: border.mobile,
      roomNumber: border.roomNumber,
      depositAmount: newDepositAmount,
      initialDepositAmount: border.initialDepositAmount,
      mealQuantity: border.mealQuantity,
      status: border.status,
      summaryAmount: newSummaryAmount,
    };

    const borderUpdate = await this.border.updateById(
      deposit?.border,
      updateBorderDto,
    );

    console.log({ summaryUpdate });

    return {
      deposit: createdDeposit,
      border: borderUpdate,
      summary: summaryUpdate,
    };
  }
}
