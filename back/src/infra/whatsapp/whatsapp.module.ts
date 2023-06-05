import { Module } from '@nestjs/common';
import { VenomBot } from './venom-bot';

@Module({
  providers: [VenomBot],
  exports: [VenomBot],
})
export class WhatsappModule {}
