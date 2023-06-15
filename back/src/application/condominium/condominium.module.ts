import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { CondominiumController } from './condominium.controller';
import { CondominiumService } from './condominium.service';
import { CondominiumRepository } from './repository/condominium.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CondominiumController],
  providers: [CondominiumService, CondominiumRepository],
})
export class CondominiumModule {}
