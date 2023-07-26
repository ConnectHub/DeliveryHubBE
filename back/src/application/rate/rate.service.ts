import { Injectable } from '@nestjs/common';
import { RateRepository } from './repository/rate.repository';
import { Rate } from 'src/domain/entities/rate';
import { UserService } from '../user/user.service';

@Injectable()
export class RateService {
  constructor(
    private readonly rateRepository: RateRepository,
    private readonly userService: UserService,
  ) {}

  async create(userId: string, rate: Rate) {
    const createdRate = await this.rateRepository.create(rate);
    await this.userService.updateRate(createdRate.id, userId);
  }
}
