import { create, Whatsapp } from 'venom-bot';

export class VenomBot {
  client: Whatsapp;

  constructor() {
    this.start();
  }

  async start() {
    this.client = await create({
      session: 'session',
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
