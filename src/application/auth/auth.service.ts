import { Injectable, Logger } from '@nestjs/common';
import { UserUnauthorized } from './errors/user-unauthorized';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginResponseDto } from './dto/loginResponse.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(login: string, password: string): Promise<LoginResponseDto> {
    this.logger.log(`Signing in user with login ${login}`);
    const user = await this.userService.findUserByLogin(login);
    if (!user) throw new UserUnauthorized();
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new UserUnauthorized();
    const payload = {
      login: user.login,
      sub: user.id,
      roles: user.roles,
      condominiumId: user.condominiumId,
    };
    return {
      authToken: await this.jwtService.signAsync(payload),
      rate: !!user.rateId,
      username: user.name,
    };
  }
}
