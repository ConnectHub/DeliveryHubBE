import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateResidentDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 40)
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  condominiumId: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(3, 20)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsOptional()
  @Length(3, 30)
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(3, 15)
  buildingApartment: string;
}
