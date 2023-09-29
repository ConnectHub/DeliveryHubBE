import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FindByDataDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  buildingApartment: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  email: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  condominiumId: string;
}
