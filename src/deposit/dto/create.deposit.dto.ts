import { IsDateString, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class createDepositDto {
  @IsNotEmpty({ message: 'date is required' })
  @IsDateString()
  dipositDate: Date;

  @IsNotEmpty({ message: 'border is required' })
  @IsMongoId()
  border: Types.ObjectId;

  @IsNotEmpty({ message: 'deposit amount is required' })
  @IsNumber()
  depositAmount: number;
}
