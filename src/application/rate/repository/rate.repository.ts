import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RateRepositoryInterface } from '@/domain/repositories/rate';
import { Rate } from '@/domain/entities/rate';

@Injectable()
export class RateRepository implements RateRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(rate: Rate): Promise<Rate> {
    const { value } = rate;
    return await this.prisma.rate.create({
      data: {
        value,
      },
    });
  }
}
