import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { NotificationService } from '../notification.service';
import { Logger } from '@nestjs/common';

@Processor('notification')
export class NotificationConsumer {
  private readonly logger = new Logger('NotificationConsumer');
  constructor(private readonly notificationService: NotificationService) {}

  @Process('order.created')
  async sendNotification(job: Job): Promise<void> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
    const { orderId, phoneNumber, orderImg } = job.data;
    await this.notificationService.sendOrderNotification(
      orderId,
      phoneNumber,
      orderImg,
    );
  }

  @OnQueueFailed()
  async handler(job: Job, error: Error): Promise<void> {
    const { phoneNumber, orderId } = job.data;
    await this.notificationService.createNotificationError(
      phoneNumber,
      orderId,
      error,
    );
  }

  @OnQueueActive()
  onActive(job: Job): void {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job): void {
    this.logger.log(`Completed job ${job.id} of type ${job.name}`);
  }
}
