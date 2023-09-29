import { Body, Controller, Post, Request } from '@nestjs/common';
import { RateService } from './rate.service';
import { CreateUpdateRateDto } from './dto/create-update-rate.dto';
import { RequestInterface } from '../auth/interfaces';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  async createOrUpdate(
    @Body() rate: CreateUpdateRateDto,
    @Request() req: RequestInterface,
  ) {
    await this.rateService.create(req.user.sub, rate);
  }
}
