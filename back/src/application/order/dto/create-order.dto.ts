import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  sender: string;

  @IsNotEmpty()
  @IsString()
  doormanId: string;

  @IsNotEmpty()
  @IsString()
  addresseeId: string;
}
