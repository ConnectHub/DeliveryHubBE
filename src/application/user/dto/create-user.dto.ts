import { Role } from '@/domain/entities/user';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  login: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsEnum(Role, { each: true })
  roles: Role[];

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  condominiumId: string;
}
