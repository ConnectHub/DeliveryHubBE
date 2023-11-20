import { Injectable, Logger } from '@nestjs/common';
import { NotificationTemplate } from './templates/notification-messsage-template';
import { NotificationErrorRepository } from './repository/notification-errors-repository';
import { PhoneNumberNotProvided } from '../order/errors/phone-number-not-provided';
import { Order } from '../../domain/entities/order';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { OrderCreatedTemplate } from './interfaces';
import { Messaging } from '@/infra/messaging/messaging';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectQueue('notification') private readonly notificationQueue: Queue,
    private readonly messaging: Messaging,
    private readonly notificationErrorRepository: NotificationErrorRepository,
    private readonly notificationTemplate: NotificationTemplate,
  ) {}

  async sendOrderNotification(
    orderId: string,
    description: string,
    trackingCode: string,
    phoneNumber: string,
    orderImg?: string,
  ): Promise<void> {
    this.logger.log(`Sending notification to ${phoneNumber}`);
    await this.sendNotification(
      this.notificationTemplate.orderCreated(
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
    this.logger.error(`Error sending notification to ${orderId}`);
    await this.notificationErrorRepository.create(message, orderId, error);
  }

  async addNotificationQueue(order: Order): Promise<void> {
    if (!order.addressee.phoneNumber) throw new PhoneNumberNotProvided();
    this.logger.log(`Adding notification to queue ${order.url}`);
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
    this.logger.log(`Sending notification to ${resident}`);
    if (orderImg)
      await this.messaging.sendImage(orderImg, resident, orderMessage.caption);
    await this.messaging.sendMessage(orderMessage.message, resident);
  }
}
