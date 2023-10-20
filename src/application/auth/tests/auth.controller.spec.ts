import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { env } from 'process';
import { UserModule } from 'src/application/user/user.module';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../guard/auth.guard';
import { LoginDto } from '../dto/login.dto';

describe('Auth controller', () => {
  let authController: AuthController;
  let authService: AuthService;

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

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a token', async () => {
      const mockLogin = {
        login: 'test',
        password: 'test123',
      } as LoginDto;
      const mockResponse = {
        authToken: '123456789',
        rate: false,
        username: 'User test',
      };

      jest.spyOn(authService, 'signIn').mockResolvedValue(mockResponse);

      const result = await authController.login(mockLogin);

      expect(authService.signIn).toHaveBeenCalledWith(
        mockLogin.login,
        mockLogin.password,
      );
      expect(result).toBe(mockResponse);
    });
  });
});
