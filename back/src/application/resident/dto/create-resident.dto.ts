import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
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
  @IsPhoneNumber('BR')
  phoneNumber: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  buildingApartment: string;
}
