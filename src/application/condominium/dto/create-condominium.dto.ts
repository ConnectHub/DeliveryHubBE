import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCondominiumDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;
}
