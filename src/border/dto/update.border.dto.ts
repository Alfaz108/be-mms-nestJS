import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { STATUS_ENUM } from 'src/constant/enums/status.Enam';

export class updateBorderDto {
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

  @IsNotEmpty({ message: 'total price is required' })
  @IsNumber()
  depositAmount: number;

  @IsNotEmpty({ message: 'meal quantity is required' })
  @IsNumber()
  mealQuantity: number;

  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  status: STATUS_ENUM;
}
