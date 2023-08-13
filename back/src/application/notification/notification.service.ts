import { Injectable } from '@nestjs/common';
import { VenomBot } from '../../infra/whatsapp/venom-bot';
import { NotificationTemplate } from './templates/notification-messsage-template';
import { NotificationErrorRepository } from './repository/notification-errors-repository';
import { PhoneNumberNotProvided } from '../order/errors/phone-number-not-provided';
import { Order } from '../../domain/entities/order';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { OrderCreatedTemplate } from './interfaces';

@Injectable()
export class NotificationService {
  constructor(
    @InjectQueue('notification') private readonly notificationQueue: Queue,
    private readonly whatsapp: VenomBot,
    private readonly notificationErrorRepository: NotificationErrorRepository,
  ) {}

  async sendOrderNotification(
    orderId: string,
    description: string,
    trackingCode: string,
    phoneNumber: string,
    orderImg?: string,
  ): Promise<void> {
    await this.sendNotification(
      new NotificationTemplate().orderCreated(
        orderId,
        trackingCode,
        description,
      ),
      phoneNumber,
      orderImg,
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
        orderImg: order?.img,
        trackingCode: order.trackingCode,
        description: order.description,
      },
      {
        attempts: 3,
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }

  private async sendNotification(
    orderMessage: OrderCreatedTemplate,
    resident: string,
    orderImg: string,
  ): Promise<void> {
    if (orderImg)
      await this.whatsapp.sendImage(orderImg, resident, orderMessage.caption);
    await this.whatsapp.sendMessage(orderMessage.message, resident);
  }
}
