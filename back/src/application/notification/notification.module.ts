import { Module } from '@nestjs/common';
import { WhatsappModule } from 'src/infra/whatsapp/whatsapp.module';
import { NotificationService } from './notification.service';
import { NotificationConsumer } from './processors/notification.consumer';
import { NotificationErrorRepository } from './repository/notification-errors-repository';
import { PrismaModule } from 'src/infra/prisma/prisma.module';

@Module({
  imports: [WhatsappModule, PrismaModule],
  providers: [
    NotificationService,
    NotificationConsumer,
    NotificationErrorRepository,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
