import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BorderModule } from './border/border.module';
import { BazarModule } from './bazar/bazar.module';
import { DepositModule } from './deposit/deposit.module';
import { MealModule } from './meal/meal.module';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    BorderModule,
    BazarModule,
    DepositModule,
    MealModule,
    SummaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
