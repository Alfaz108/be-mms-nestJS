import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BorderService } from 'src/border/border.service';
import { Summary } from './Schemas/summary.schema';
import { BazarService } from 'src/bazar/bazar.service';
import { CreateSummaryDto } from './dto/create.summary.dto';
import { UpdateSummaryDto } from './dto/update.summary.dto copy';

@Injectable()
export class SummaryService {
  constructor(
    @InjectModel(Summary.name)
    private summaryModel: mongoose.Model<Summary>,
    // private readonly border: BorderService,
    private readonly bazar: BazarService,
  ) {}

  async findAll(): Promise<Summary[]> {
    const border = await this.summaryModel.find();
    return border;
  }

  async create(summary: CreateSummaryDto): Promise<Summary> {
    const res = await this.summaryModel.create(summary);
    return res;
  }

  async updateById(id: string, summary: UpdateSummaryDto): Promise<Summary> {
    return await this.summaryModel.findByIdAndUpdate(id, summary, {
      new: true,
      runValidators: true,
    });
  }

  async findByBorderId(id: mongoose.Types.ObjectId): Promise<Summary> {
    const border = await this.summaryModel.findOne({ border: id });
    return border;
  }
}
