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
    const newCondominium = await this.condominiumService.createCondominium(
      condominium,
    );
    return CondominiumViewModel.toHttp(newCondominium);
  }

  @Post('update')
  async update(@Body() condominium: UpdateCondominiumDto) {
    const updateCondominium = await this.condominiumService.updateCondominium(
      condominium,
    );
    return CondominiumViewModel.toHttp(updateCondominium);
  }

  @Get('list')
  async list() {
    const condominiums = await this.condominiumService.listAllCondominiums();
    return condominiums.map(CondominiumViewModel.toHttp);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const condominium = await this.condominiumService.findById(id);
    return CondominiumViewModel.toHttp(condominium);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.condominiumService.deleteCondominium(id);
  }
}
