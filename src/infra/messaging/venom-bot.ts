import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { create, Whatsapp } from 'venom-bot';
import { Messaging } from './messaging';

@Injectable()
export class VenomBot
  implements OnApplicationShutdown, OnModuleInit, Messaging
{
  private readonly logger = new Logger('VenomBot');
  private client: Whatsapp;

  async onApplicationShutdown() {
    this.logger.log('Closing whatsapp client');
    if (!this.client) return;
    await this.client.close();
  }

  async onModuleInit() {
    this.logger.log('Starting whatsapp client');
    await this.start().catch((err) => {
      this.logger.error(err);
    });
  }

  private async start() {
    this.client = await create({
      session: 'session',
      headless: 'new',
    });
  }

  async sendMessage(message: string, recipient: string): Promise<void> {
    this.logger.log('Sending message:', message, 'to', recipient);
    await this.client.sendText(recipient, message).catch((err) => {
      this.logger.error(err);
    });
  }

  async sendImage(
    file: string,
    recipient: string,
    caption: string,
  ): Promise<void> {
    this.logger.log('Sending file:', file, 'to', recipient);
    await this.client
      .sendImage(recipient, file, caption, caption)
      .catch((err) => {
        this.logger.error(err);
      });
  }
}
