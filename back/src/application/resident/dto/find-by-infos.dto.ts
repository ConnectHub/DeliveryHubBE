import { IsOptional } from 'class-validator';

export class FindByDataDto {
  @IsOptional()
  name: string;

  @IsOptional()
  buildingApartment: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  email: string;

  @IsOptional()
  condominiumId: string;
}
