import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Bazar } from './schemas/bazar.schema';
import { createBazarDto } from './dto/create.bazar.dto';
import { updateBazarDto } from './dto/update.bazar.dto';

@Injectable()
export class BazarService {
  constructor(
    @InjectModel(Bazar.name)
    private bazarModel: mongoose.Model<Bazar>,
  ) {}
  async findAll(): Promise<Bazar[]> {
    const bazar = await this.bazarModel.find();
    return bazar;
  }

  async create(bazar: createBazarDto): Promise<Bazar> {
    const res = await this.bazarModel.create(bazar);
    return res;
  }

  async findById(id: string): Promise<Bazar> {
    const bazar = await this.bazarModel.findById(id);
    return bazar;
  }

  async updateById(id: string, bazar: updateBazarDto): Promise<Bazar> {
    return await this.bazarModel.findByIdAndUpdate(id, bazar, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Bazar> {
    return await this.bazarModel.findByIdAndDelete(id);
  }
}
