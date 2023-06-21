import { OnApplicationShutdown } from '@nestjs/common';
import { create, Whatsapp } from 'venom-bot';

export class VenomBot implements OnApplicationShutdown {
  client: Whatsapp;

  constructor() {
    this.start();
  }

  async onApplicationShutdown() {
    console.log('Closing whatsapp client');
    await this.client.close();
  }

  async start() {
    this.client = await create({
      session: 'session',
      headless: true,
    });
  }

  async sendMessage(message: string, recipient: string) {
    console.log('Sending message:', message, 'to', recipient);
    await this.client.sendText(recipient, message);
  }

  async sendFile(file: string, recipient: string) {
    console.log('Sending file:', file, 'to', recipient);
    await this.client.sendFile(recipient, file);
  }
}
