import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/domain/entities/order';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
