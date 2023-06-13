import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infra/prisma/prisma.module';

import { ResidentController } from './resident.controller';
import { ResidentRepository } from './repository/resident.repository';
import { ResidentService } from './resident.service';

@Module({
  imports: [PrismaModule],
  controllers: [ResidentController],
  providers: [ResidentService, ResidentRepository],
})
export class ResidentModule {}
