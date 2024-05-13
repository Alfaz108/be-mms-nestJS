import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { DepositSchema } from './Schemas/deposit.schema';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import { BorderModule } from 'src/border/border.module';
import { SummaryModule } from 'src/summary/summary.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Deposit', schema: DepositSchema }]),
    BorderModule,
    SummaryModule,
  ],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
