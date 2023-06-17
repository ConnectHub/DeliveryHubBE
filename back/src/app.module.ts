import { Module } from '@nestjs/common';
import { OrderModule } from './application/order/order.module';
import { NotificationModule } from './application/notification/notification.module';
import { ResidentModule } from './application/resident/resident.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrderModule,
    NotificationModule,
    ResidentModule,
  ],
})
export class AppModule {}
