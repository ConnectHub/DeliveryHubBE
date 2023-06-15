import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResidentService } from './resident.service';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';

@Controller('resident')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @Post('create')
  async create(@Body() resident: CreateResidentDto) {
    const newResident = await this.residentService.createResident(resident);
    return newResident;
  }

  @Get('list')
  async list() {
    const allResidents = await this.residentService.listAllResidents();
    return allResidents;
  }

  @Get('resident/:id')
  async findById(@Param('id') id: string) {
    const allResidents = await this.residentService.findById(id);
    return allResidents;
  }

  @Get('phone/:residentPhone')
  async findByPhoneNumber(@Param('residentPhone') residentPhone: string) {
    return await this.residentService.findByPhoneNumber(residentPhone);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.residentService.deleteResident(id);
  }

  @Post('/update/')
  async update(@Body() residentInfos: UpdateResidentDto) {
    return await this.residentService.updateResidentInfos(residentInfos);
  }
}
