import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaModule } from '@/infra/prisma/prisma.module';
import { DashboardRepository } from './repository/dashboard.repository';
import { CondominiumRepository } from '../condominium/repository/condominium.repository';

@Module({
  imports: [PrismaModule],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository, CondominiumRepository],
  exports: [DashboardService],
})
export class DashboardModule {}
