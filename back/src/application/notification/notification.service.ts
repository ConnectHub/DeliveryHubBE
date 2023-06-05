import { Injectable } from '@nestjs/common';
import { VenomBot } from 'src/infra/whatsapp/venom-bot';

@Injectable()
export class NotificationService {
  constructor(private readonly whatsapp: VenomBot) {}

  async sendNotification(message: string, resident: string): Promise<void> {
    await this.whatsapp.sendMessage(message, resident);
  }
}
