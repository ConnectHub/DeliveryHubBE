import { Role } from '@prisma/client';
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
  @Length(5)
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  roles: Role[];
}
