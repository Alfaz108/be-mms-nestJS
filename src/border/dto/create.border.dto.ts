import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { STATUS_ENUM } from 'src/constant/enums/status.enum';

export class createBorderDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be valid' })
  @MinLength(2, { message: 'Minimum length should be 2 characters' })
  readonly name: string;

  @IsNotEmpty({ message: 'Mobile is required' })
  @IsString({ message: 'Mobile must be valid' })
  readonly mobile: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid' })
  readonly email?: string;

  @IsNotEmpty()
  @IsString({ message: 'Room Number must be valid' })
  readonly roomNumber: string;

  @IsNotEmpty({ message: 'total price is required' })
  @IsNumber()
  initialDepositAmount: number;

  @IsNotEmpty({ message: 'meal quantity is required' })
  @IsNumber()
  mealQuantity: number;

  @IsNotEmpty({ message: 'meal rate is required' })
  @IsNumber()
  mealRate: number;

  @IsNotEmpty({ message: 'total cost is required' })
  @IsNumber()
  totalCost: number;

  @IsNotEmpty({ message: 'summary amount is required' })
  @IsNumber()
  summaryAmount: number;

  @IsNotEmpty({ message: 'deposit amount is required' })
  @IsNumber()
  depositAmount: number;

  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  status: STATUS_ENUM;
}
