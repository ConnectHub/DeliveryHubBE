import { Injectable } from '@nestjs/common';
import { UserUnauthorized } from './errors/user-unauthorized';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async signIn(email: string, pass: string): Promise<any> {
    const user = { email: email, password: pass };
    if (user?.password !== pass) throw new UserUnauthorized();
    const payload = { username: user.email };
    return {
      authToken: await this.jwtService.signAsync(payload),
    };
  }
}
