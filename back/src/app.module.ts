import { Module } from '@nestjs/common';
import { OrderModule } from './application/order/order.module';
import { NotificationModule } from './application/notification/notification.module';
import { ResidentModule } from './application/resident/resident.module';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { CondominiumModule } from './application/condominium/condominum.module';
import { AuthModule } from './application/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
    NotificationModule,
    OrderModule,
    ResidentModule,
    CondominiumModule,
    AuthModule,
  ],
})
export class AppModule {}
