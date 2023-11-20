import { APP_GUARD } from '@nestjs/core';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { TestingModule, Test } from '@nestjs/testing';
import { env } from 'process';
import { UserModule } from '@/application/user/user.module';
import { UserService } from '@/application/user/user.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../guard/auth.guard';
import { User } from '@/domain/entities/user';
import * as bcrypt from 'bcrypt';
import { UserUnauthorized } from '../errors/user-unauthorized';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userService: UserService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: env.JWT_SECRET,
          signOptions: { expiresIn: '50d' },
        }),
        UserModule,
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
        AuthService,
      ],
      exports: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  describe('singIn', () => {
    it('should return a login response with authToken, rate and username', async () => {
      const mockUser = {
        name: 'User test',
        login: 'test',
        password: 'test123',
        roles: ['ADMIN'],
      } as User;
      const mockPayload = {
        login: mockUser.login,
        sub: mockUser.id,
        roles: mockUser.roles,
        condominiumId: mockUser.condominiumId,
      };
      const mockResponse = {
        authToken: await jwtService.signAsync(mockPayload),
        rate: false,
        username: 'User test',
      };

      jest.spyOn(userService, 'findUserByLogin').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

      const result = await authService.signIn(
        mockUser.login,
        mockUser.password,
      );

      expect(userService.findUserByLogin).toHaveBeenCalledWith(mockUser.login);
      expect(await userService.findUserByLogin(mockUser.login)).toEqual(
        mockUser,
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if user is not found', async () => {
      const login = 'test';
      const password = 'test123';

      jest.spyOn(userService, 'findUserByLogin').mockResolvedValue(undefined);

      const result = authService.signIn(login, password);
      expect(result).rejects.toThrow(UserUnauthorized);
    });

    it('should throw an error if password is incorrect', async () => {
      const login = 'test';
      const password = 'test123';
      const mockUser = {
        name: 'User test',
        login,
        password,
        roles: ['ADMIN'],
      } as User;

      jest.spyOn(userService, 'findUserByLogin').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

      expect(authService.signIn(login, password)).rejects.toThrow(
        UserUnauthorized,
      );
    });
  });
});
