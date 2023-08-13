import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateResidentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 40)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  condominiumId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('BR')
  phoneNumber: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  buildingApartment: string;
}
