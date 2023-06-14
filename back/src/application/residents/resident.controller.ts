import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResidentService } from './resident.service';
import { CreateResidentDto } from './dto/create-resident.dto';

@Controller('resident')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}
  @Get()
  test(): string {
    return 'Rota de resident, método GET: OK!';
  }

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
}
