import { Injectable } from '@nestjs/common';
import { RateRepository } from './repository/rate.repository';
import { Rate } from 'src/domain/entities/rate';
import { CondominiumService } from '../condominium/condominium.service';

@Injectable()
export class RateService {
  constructor(
    private readonly rateRepository: RateRepository,
    private readonly condominiumService: CondominiumService,
  ) {}

  async create(userId: string, rate: Rate) {
    const createdRate = await this.rateRepository.create(rate);
    await this.condominiumService.updateRate(createdRate.id, userId);
  }
}
