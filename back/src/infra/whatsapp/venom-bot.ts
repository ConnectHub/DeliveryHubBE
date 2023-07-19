import { Logger, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { create, Whatsapp } from 'venom-bot';

export class VenomBot implements OnApplicationShutdown, OnModuleInit {
  private readonly logger = new Logger(VenomBot.name);
  private client: Whatsapp;

  async onApplicationShutdown() {
    this.logger.log('Closing whatsapp client');
    if (!this.client) return;
    await this.client.close();
  }

  async onModuleInit() {
    await this.start();
  }

  private async start() {
    this.client = await create({
      session: 'session',
      headless: 'new',
    });
  }

  async sendMessage(message: string, recipient: string) {
    this.logger.log('Sending message:', message, 'to', recipient);
    await this.client.sendText(recipient, message);
  }

  async sendFile(file: string, recipient: string) {
    this.logger.log('Sending file:', file, 'to', recipient);
    await this.client.sendFile(recipient, file);
  }
}
