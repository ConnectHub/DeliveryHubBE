import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;

  signature: string;
}
