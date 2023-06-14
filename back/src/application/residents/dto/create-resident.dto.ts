import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateResidentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  condominiumId: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  email?: string;

  @IsNotEmpty()
  buildingApartment: string;
}
