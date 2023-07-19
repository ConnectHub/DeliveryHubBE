import { OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { create, Whatsapp } from 'venom-bot';

export class VenomBot implements OnApplicationShutdown, OnModuleInit {
  client: Whatsapp;

  async onApplicationShutdown() {
    console.log('Closing whatsapp client');
    if (!this.client) return;
    await this.client.close();
  }

  async onModuleInit() {
    await this.start();
  }

  async start() {
    this.client = await create({
      session: 'session',
      headless: 'new',
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
