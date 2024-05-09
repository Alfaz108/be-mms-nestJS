import { IsDateString, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class createBazarDto {
  @IsNotEmpty({ message: 'date is required' })
  @IsDateString()
  bazarDate: Date;

  @IsNotEmpty({ message: 'total price is required' })
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty({ message: 'border is required' })
  @IsMongoId()
  border: Types.ObjectId;
}
