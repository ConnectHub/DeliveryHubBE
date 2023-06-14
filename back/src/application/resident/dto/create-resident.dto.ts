import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateResidentDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 40)
  name: string;

  @IsNotEmpty()
  @IsString()
  condominiumId: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  phoneNumber: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @Length(3, 30)
  email?: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  buildingApartment: string;
}
