import { Body, Controller, Post } from '@nestjs/common';
import { CondominiumService } from './condominium.service';
import { CreateCondominiumDto } from './dto/create-condominium.dto';

@Controller('condominium')
export class CondominiumController {
  constructor(private readonly condominiumService: CondominiumService) {}
  @Post('create')
  async create(@Body() condominium: CreateCondominiumDto) {
    const newCondominium = await this.condominiumService.createCondominium(
      condominium,
    );
    return newCondominium;
  }
}
