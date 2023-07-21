import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCondominiumDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  @IsEmail()
  login: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @IsEnum(Role, { each: true })
  @IsNotEmpty()
  roles: Role[];
}
