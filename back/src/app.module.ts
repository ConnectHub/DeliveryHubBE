import { Module } from '@nestjs/common';
import { OrderModule } from './application/order/order.module';
import { NotificationModule } from './application/notification/notification.module';
import { ResidentModule } from './application/resident/resident.module';
import { CondominiumModule } from './application/condominium/condominium.module';

@Module({
  imports: [OrderModule, NotificationModule, ResidentModule, CondominiumModule],
})
export class AppModule {}
