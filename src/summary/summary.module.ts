import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { SummarySchema } from './Schemas/summary.schema';

import { BorderModule } from 'src/border/border.module';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { BazarModule } from 'src/bazar/bazar.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Summary', schema: SummarySchema }]),
    BorderModule,
    BazarModule,
  ],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
