import { Module } from '@nestjs/common';
import { OrderModule } from './application/order/order.module';
import { NotificationModule } from './application/notification/notification.module';
import { ResidentModule } from './application/residents/resident.module';

@Module({
  imports: [OrderModule, NotificationModule, ResidentModule],
})
export class AppModule {}
