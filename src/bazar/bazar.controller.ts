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
import { BazarService } from './bazar.service';
import { Bazar } from './schemas/bazar.schema';
import { createBazarDto } from './dto/create.bazar.dto';
import { updateBazarDto } from './dto/update.bazar.dto';

@Controller('bazar')
export class BazarController {
  constructor(private readonly bazarService: BazarService) {}

  // GET all bazars
  @Get()
  @UseGuards(AuthGuard())
  async getAllBazars(): Promise<Bazar[]> {
    return this.bazarService.findAll();
  }

  // POST a new bazar
  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() bazar: createBazarDto) {
    try {
      const data = await this.bazarService.create(bazar);
      return {
        data,
        message: 'bazar created successfully',
      };
    } catch (error) {
      return {
        error: error.message,
        message: 'bazar created failed',
      };
    }
  }

  // GET a bazar by ID
  @Get(':id')
  @UseGuards(AuthGuard())
  async getBazar(@Param('id') id: string): Promise<Bazar> {
    return this.bazarService.findById(id);
  }

  // // PUT update a bazar by ID
  @Put(':id')
  @UseGuards(AuthGuard())
  async updateBazar(@Param('id') id: string, @Body() bazar: updateBazarDto) {
    try {
      const data = await this.bazarService.updateById(id, bazar);
      return {
        data,
        message: 'bazar update successfully',
      };
    } catch (error) {
      return {
        error: error.message,
        message: 'bazar update failed',
      };
    }
  }

  // // DELETE a bazar by ID
  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteBazar(@Param('id') id: string) {
    try {
      const data = await this.bazarService.deleteById(id);
      return {
        data,
        message: 'bazar delete successfully',
      };
    } catch (error) {
      return {
        error: error.message,
        message: 'bazar delete failed',
      };
    }
  }
}
