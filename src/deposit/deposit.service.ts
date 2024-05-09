import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Deposit } from './Schemas/deposit.schema';
import { createDepositDto } from './dto/create.deposit.dto';
import { Border } from 'src/border/schemas/border.schema';
import { BorderService } from 'src/border/border.service';
import { updateBorderDto } from 'src/border/dto/update.border.dto';

@Injectable()
export class DepositService {
  constructor(
    @InjectModel(Deposit.name)
    private depositModel: mongoose.Model<Deposit>,
    private readonly border: BorderService,
  ) {}

  async findAll(): Promise<Deposit[]> {
    const deposit = await this.depositModel.find();
    return deposit;
  }
  async create(
    deposit: createDepositDto,
  ): Promise<{ deposit: Deposit; border: Border }> {
    const border = await this.border.findById(deposit?.border);
    if (!border) {
      throw new NotFoundException('Border not found');
    }

    const newDepositAmount =
      Number(deposit?.depositAmount) + Number(border?.depositAmount);

    const updateDto: updateBorderDto = {
      name: border.name,
      mobile: border.mobile,
      roomNumber: border.roomNumber,
      depositAmount: newDepositAmount,
      initialDepositAmount: border.initialDepositAmount,
      mealQuantity: border.mealQuantity,
      status: border.status,
    };

    const createdDeposit = await this.depositModel.create(deposit);
    const borderUpdate = await this.border.updateById(
      deposit?.border,
      updateDto,
    );

    console.log({ borderUpdate });

    return { deposit: createdDeposit, border: borderUpdate };
  }
}
