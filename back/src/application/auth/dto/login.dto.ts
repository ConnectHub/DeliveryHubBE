import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  login: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string;
}
