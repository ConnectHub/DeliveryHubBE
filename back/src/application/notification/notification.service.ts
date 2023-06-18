import { Injectable } from '@nestjs/common';
import { VenomBot } from 'src/infra/whatsapp/venom-bot';
import { NotificationTemplate } from './templates/notification-messsage-template';
import { NotificationErrorRepository } from './repository/notification-errors-repository';

@Injectable()
export class NotificationService {
  constructor(
    private readonly whatsapp: VenomBot,
    private readonly notificationErrorRepository: NotificationErrorRepository,
  ) {}

  private async sendNotification(
    message: string,
    resident: string,
  ): Promise<void> {
    await this.whatsapp.sendMessage(message, resident);
  }

  async sendOrderNotification(
    orderId: string,
    phoneNumber: string,
  ): Promise<void> {
    await this.sendNotification(
      new NotificationTemplate().orderCreated(orderId),
      phoneNumber,
    );
  }

  async createNotificationError(
    message: string,
    orderId: string,
    error: Error,
  ): Promise<void> {
    await this.notificationErrorRepository.create(message, orderId, error);
  }
}
