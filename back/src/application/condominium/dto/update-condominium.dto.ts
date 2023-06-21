import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateCondominiumDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  @IsEmail()
  login: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;
}
