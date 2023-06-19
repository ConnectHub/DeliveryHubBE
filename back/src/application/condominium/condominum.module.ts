import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { CondominiumRepository } from './repository/condominium.repository';
import { CondominiumController } from './condominum.controller';
import { CondominiumService } from './condominum.service';

@Module({
  imports: [PrismaModule],
  controllers: [CondominiumController],
  providers: [CondominiumService, CondominiumRepository],
})
export class CondominiumModule {}
