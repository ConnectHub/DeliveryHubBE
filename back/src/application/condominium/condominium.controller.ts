import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';
import { CondominiumService } from './condominium.service';
import { CondominiumViewModel } from './view-model/condominium-view-model';

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

  @Get('list')
  async list() {
    const orders = await this.condominiumService.listAllCondominiums();
    return orders.map(CondominiumViewModel.toHttp);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.condominiumService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.condominiumService.deleteCondominium(id);
  }
}
