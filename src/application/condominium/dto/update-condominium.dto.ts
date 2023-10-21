import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class UpdateCondominiumDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;
}
