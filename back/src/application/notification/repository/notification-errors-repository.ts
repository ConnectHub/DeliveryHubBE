import { Injectable } from '@nestjs/common';
import { InboxMessageErrorsInterface } from 'src/domain/repositories/inbox-message-errors';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class NotificationErrorRepository
  implements InboxMessageErrorsInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async create(message: string, orderId: string, error: Error): Promise<void> {
    await this.prisma.inboxMessageErrors.create({
      data: {
        message,
        orderId,
        error: JSON.stringify(error),
      },
    });
  }
}
