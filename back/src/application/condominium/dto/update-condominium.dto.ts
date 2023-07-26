import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCondominiumDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;
}
