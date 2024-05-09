import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Border } from './schemas/border.schema';
import { createBorderDto } from './dto/create.border.dto';
import { updateBorderDto } from './dto/update.border.dto';

@Injectable()
export class BorderService {
  constructor(
    @InjectModel(Border.name)
    private borderModel: mongoose.Model<Border>,
  ) {}
  async findAll(): Promise<Border[]> {
    const border = await this.borderModel.find();
    return border;
  }

  async create(border: createBorderDto): Promise<Border> {
    const res = await this.borderModel.create(border);
    return res;
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
