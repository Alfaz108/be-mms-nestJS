import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Minimum length should be 2 characters' })
  readonly name: string;

  @IsNotEmpty()
  @IsString({ message: 'Please enter a correct mobile number' })
  readonly mobile: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please enter a correct email' })
  readonly email?: string;

  @IsNotEmpty()
  @IsString({ message: 'Please enter a correct room number' })
  readonly roomNumber?: string;

  @IsNotEmpty()
  readonly month?: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Minimum password length should be 6 characters' })
  readonly password: string;
}
