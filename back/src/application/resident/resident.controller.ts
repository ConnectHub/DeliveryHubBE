import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ResidentService } from './resident.service';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { FindByDataDto } from './dto/find-by-infos.dto';

@Controller('resident')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @Post('create')
  async create(@Body() resident: CreateResidentDto) {
    return await this.residentService.createResident(resident);
  }

  @Get('list')
  async list() {
    return await this.residentService.listAllResidents();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.residentService.findById(id);
  }

  @Get('filter/by')
  async findByData(
    @Query()
    data: FindByDataDto,
  ) {
    return await this.residentService.findByData(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.residentService.deleteResident(id);
  }

  @Post('/update')
  async update(@Body() residentInfos: UpdateResidentDto) {
    return await this.residentService.updateResidentInfos(residentInfos);
  }
}
