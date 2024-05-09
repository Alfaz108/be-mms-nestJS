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
import { SummaryService } from './summary.service';
import { Summary } from './Schemas/summary.schema';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  // GET all bazars
  @Get()
  @UseGuards(AuthGuard())
  async getAllBorderSummary(): Promise<Summary[]> {
    return this.summaryService.findAll();
  }
}
