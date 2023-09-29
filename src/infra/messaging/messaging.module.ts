import { Module } from '@nestjs/common';
import { VenomBot } from './venom-bot';
import { Messaging } from './messaging';

@Module({
  providers: [{ provide: Messaging, useClass: VenomBot }],
  exports: [Messaging],
})
export class MessagingModule {}
