import { Module } from '@nestjs/common';
import { WhatsappModule } from '../../infra/whatsapp/whatsapp.module';
import { NotificationService } from './notification.service';
import { NotificationConsumer } from './processors/notification.consumer';
import { NotificationErrorRepository } from './repository/notification-errors-repository';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { BullModule } from '@nestjs/bull';
import { NotificationTemplate } from './templates/notification-messsage-template';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification',
    }),
    WhatsappModule,
    PrismaModule,
  ],
  providers: [
    NotificationService,
    NotificationConsumer,
    NotificationErrorRepository,
    NotificationTemplate,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
