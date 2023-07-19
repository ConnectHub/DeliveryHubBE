import { Injectable } from '@nestjs/common';
import { VenomBot } from '../..//infra/whatsapp/venom-bot';
import { NotificationTemplate } from './templates/notification-messsage-template';
import { NotificationErrorRepository } from './repository/notification-errors-repository';
import { PhoneNumberNotProvided } from '../order/errors/phone-number-not-provided';
import { Order } from '../../domain/entities/order';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class NotificationService {
  constructor(
    @InjectQueue('notification') private readonly notificationQueue: Queue,
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

  async addNotificationQueue(order: Order): Promise<void> {
    if (!order.addressee.phoneNumber) throw new PhoneNumberNotProvided();
    await this.notificationQueue.add(
      'order.created',
      {
        orderId: order.url,
        phoneNumber: order.addressee.phoneNumber,
      },
      {
        attempts: 3,
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }
}
