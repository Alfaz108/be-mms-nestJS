import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { BazarSchema } from './schemas/bazar.schema';
import { BazarService } from './bazar.service';
import { BazarController } from './bazar.controller';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Bazar', schema: BazarSchema }]),
  ],
  controllers: [BazarController],
  providers: [BazarService],
  exports: [BazarService],
})
export class BazarModule {}
