import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  addresseeId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imgSrc: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  trackingCode: string;

  code: string;
}
