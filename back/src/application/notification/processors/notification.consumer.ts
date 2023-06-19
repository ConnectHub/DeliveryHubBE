import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { NotificationService } from '../notification.service';

@Processor('notification')
export class NotificationConsumer {
  constructor(private readonly notificationService: NotificationService) {}

  @Process('order.created')
  async sendNotification(job: Job): Promise<void> {
    const { orderId, phoneNumber } = job.data;
    await this.notificationService.sendOrderNotification(orderId, phoneNumber);
  }

  @OnQueueFailed()
  async handler(job: Job, error: Error): Promise<void> {
    const { message, orderId } = job.data;
    await this.notificationService.createNotificationError(
      message,
      orderId,
      error,
    );
  }

  @OnQueueActive()
  onActive(job: Job): void {
    console.log(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job): void {
    console.log(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  onQueueCompleted(job: Job): void {
    console.log(`Completed job ${job.id} of type ${job.name}`);
  }
}
