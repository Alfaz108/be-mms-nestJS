import { Module } from '@nestjs/common';
import { BorderController } from './border.controller';
import { BorderService } from './border.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { BorderSchema } from './schemas/border.schema';
import { BazarModule } from 'src/bazar/bazar.module';
import { SummaryModule } from 'src/summary/summary.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Border', schema: BorderSchema }]),
    BazarModule,
    SummaryModule,
  ],

  controllers: [BorderController],
  providers: [BorderService],
  exports: [BorderService],
})
export class BorderModule {}
