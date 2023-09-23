import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { RateRepository } from './repository/rate.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [RateController],
  providers: [RateService, RateRepository],
})
export class RateModule {}
