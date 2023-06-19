import { Body, Controller, Post } from '@nestjs/common';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';
import { CondominiumService } from './condominum.service';

@Controller('condominium')
export class CondominiumController {
  constructor(private readonly condominiumService: CondominiumService) {}
  @Post('create')
  async create(@Body() condominium: CreateCondominiumDto) {
    return await this.condominiumService.createCondominium(condominium);
  }

  @Post('update')
  async update(@Body() condominium: UpdateCondominiumDto) {
    return await this.condominiumService.updateCondominium(condominium);
  }
}
