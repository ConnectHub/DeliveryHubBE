import { Module } from '@nestjs/common';
import { OrderModule } from './application/order/order.module';
import { NotificationModule } from './application/notification/notification.module';
import { ResidentModule } from './application/resident/resident.module';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { CondominiumModule } from './application/condominium/condominium.module';

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
  ],
})
export class AppModule {}
