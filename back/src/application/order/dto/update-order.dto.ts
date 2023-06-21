import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({
    enum: [Status],
  })
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  orderId: string;
}
