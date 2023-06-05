import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { WhatsappModule } from 'src/infra/whatsapp/whatsapp.module';
import { NotificationService } from './notification.service';

@Module({
  imports: [PrismaModule, WhatsappModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
