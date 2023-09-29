import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateResidentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 40)
  @IsOptional()
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  condominiumId: string;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(3, 20)
  phoneNumber: string;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsOptional()
  @Length(3, 30)
  email: string;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(3, 15)
  buildingApartment: string;
}
