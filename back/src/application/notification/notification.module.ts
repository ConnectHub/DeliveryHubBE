import { Module } from '@nestjs/common';
import { WhatsappModule } from 'src/infra/whatsapp/whatsapp.module';
import { NotificationService } from './notification.service';

@Module({
  imports: [WhatsappModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
