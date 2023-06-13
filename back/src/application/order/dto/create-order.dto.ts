import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  sender: string;

  @IsNotEmpty()
  @IsString()
  addresseeId: string;
}
