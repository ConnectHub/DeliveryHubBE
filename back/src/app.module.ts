import { Module } from '@nestjs/common';
import { OrderModule } from './application/order/order.module';
import { NotificationModule } from './application/notification/notification.module';

@Module({
  imports: [OrderModule, NotificationModule],
})
export class AppModule {}
