import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { STATUS_ENUM } from 'src/constant/enums/status.Enam';

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

  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  sataus: STATUS_ENUM;
}
