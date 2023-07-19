import { Injectable } from '@nestjs/common';
import { UserUnauthorized } from './errors/user-unauthorized';
import { JwtService } from '@nestjs/jwt';
import { CondominiumService } from '../condominium/condominium.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly condominiumService: CondominiumService,
  ) {}

  async signIn(
    login: string,
    password: string,
  ): Promise<{
    authToken: string;
  }> {
    const user = await this.condominiumService.findCondominiumByLogin(login);
    if (!user) throw new UserUnauthorized();
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new UserUnauthorized();
    const payload = { login: user.login, sub: user.id, roles: user.roles };
    return {
      authToken: await this.jwtService.signAsync(payload),
    };
  }
}
