import { Module } from '@nestjs/common';
import { OrderModule } from './application/order/order.module';
import { NotificationModule } from './application/notification/notification.module';
import { ResidentModule } from './application/resident/resident.module';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { CondominiumModule } from './application/condominium/condominium.module';
<<<<<<< HEAD
=======
import { AuthModule } from './application/auth/auth.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RateModule } from './application/rate/rate.module';
import { UserModule } from './application/user/user.module';
import { DashboardModule } from './application/dashboard/dashboard.module';
import { EnvModule } from './infra/env/env.module';
import { env } from './infra/env/env.service';
>>>>>>> 66b4d45895eb986b9ba4f4f26508c43771df0190

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      cache: true,
    }),
    EnvModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 5,
    }),
    BullModule.forRoot({
      redis: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
      },
    }),
    NotificationModule,
    OrderModule,
    ResidentModule,
    CondominiumModule,
    AuthModule,
    RateModule,
    UserModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
