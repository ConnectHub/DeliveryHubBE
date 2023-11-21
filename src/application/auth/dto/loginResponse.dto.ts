import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDto {
  @IsString()
  @IsNotEmpty()
  authToken: string;

  @IsString()
  rate: boolean;

  @IsString()
  @IsNotEmpty()
  username: string;
}
