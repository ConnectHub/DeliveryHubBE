import { Injectable } from '@nestjs/common';
import { UserUnauthorized } from './errors/user-unauthorized';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(
    login: string,
    password: string,
  ): Promise<{
    authToken: string;
    rate: boolean;
    username: string;
  }> {
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
