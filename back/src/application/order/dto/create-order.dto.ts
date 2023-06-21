import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  sender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  addresseeId: string;

  code: string;
}
