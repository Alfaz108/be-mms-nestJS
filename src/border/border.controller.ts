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
import { BorderService } from './border.service';
import { Border } from './schemas/border.schema';

import { AuthGuard } from '@nestjs/passport';
import { createBorderDto } from './dto/create.border.dto';
import { updateBorderDto } from './dto/update.border.dto';
import mongoose from 'mongoose';

@Controller('border')
export class BorderController {
  constructor(private readonly borderService: BorderService) {}

  // GET all borders
  @Get()
  @UseGuards(AuthGuard())
  async getAllBorders(): Promise<Border[]> {
    return this.borderService.findAll();
  }

  // POST a new border
  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() border: createBorderDto) {
    try {
      const data = await this.borderService.create(border);
      return {
        data,
        message: 'border created successfully',
      };
    } catch (error) {
      return {
        error: error.message,
        message: 'border created failed',
      };
    }
  }

  // GET a border by ID
  @Get(':id')
  @UseGuards(AuthGuard())
  async getBorder(@Param('id') id: mongoose.Types.ObjectId): Promise<Border> {
    return this.borderService.findById(id);
  }

  // PUT update a border by ID
  @Put(':id')
  @UseGuards(AuthGuard())
  async updateBorder(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body() border: updateBorderDto,
  ) {
    try {
      const data = await this.borderService.updateById(id, border);
      return {
        data,
        message: 'border update successfully',
      };
    } catch (error) {
      return {
        error: error.message,
        message: 'border update failed',
      };
    }
  }

  // DELETE a border by ID
  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteBorder(@Param('id') id: string) {
    try {
      const data = await this.borderService.deleteById(id);
      return {
        data,
        message: 'border delete successfully',
      };
    } catch (error) {
      return {
        error: error.message,
        message: 'border delete failed',
      };
    }
  }

  
}
