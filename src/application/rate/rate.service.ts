import { Injectable, Logger } from '@nestjs/common';
import { RateRepository } from './repository/rate.repository';
import { Rate } from '@/domain/entities/rate';
import { UserService } from '../user/user.service';

@Injectable()
export class RateService {
  private readonly logger = new Logger(RateService.name);

  constructor(
    private readonly rateRepository: RateRepository,
    private readonly userService: UserService,
  ) {}

  async create(userId: string, rate: Rate) {
    this.logger.log(`Creating rate with user id ${userId}`);
    const createdRate = await this.rateRepository.create(rate);
    await this.userService.updateRate(createdRate.id, userId);
  }
}
