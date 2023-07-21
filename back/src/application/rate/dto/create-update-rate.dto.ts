import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateUpdateRateDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  value: number;
}
