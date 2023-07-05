import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { CondominiumRepository } from './repository/condominium.repository';
import { CondominiumController } from './condominium.controller';
import { CondominiumService } from './condominium.service';

@Module({
  imports: [PrismaModule],
  controllers: [CondominiumController],
  providers: [CondominiumService, CondominiumRepository],
  exports: [CondominiumService],
})
export class CondominiumModule {}
