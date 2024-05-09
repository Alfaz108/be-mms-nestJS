import { Module } from '@nestjs/common';
import { BorderController } from './border.controller';
import { BorderService } from './border.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Border, BorderSchema } from './schemas/border.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Border', schema: BorderSchema }]),
  ],

  controllers: [BorderController],
  providers: [BorderService],
  exports: [BorderService],
})
export class BorderModule {}
