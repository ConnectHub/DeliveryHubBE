import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ResidentService } from './resident.service';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { FindByDataDto } from './dto/find-by-infos.dto';
import { ResidentViewModel } from './view-model/resident-view-model';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RequestInterface } from '../auth/interfaces';
import { ErrorInterceptor } from '@/infra/utils/error-interceptor';

@ApiTags('resident')
@Controller('resident')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @ApiOkResponse({ type: ResidentViewModel })
  @Post('create')
  async create(@Body() resident: CreateResidentDto) {
    return await this.residentService.createResident(resident);
  }

  @ApiOkResponse({ type: [ResidentViewModel] })
  @Get('list')
  async list(@Request() req: RequestInterface) {
    const residents = await this.residentService.listAllResidents(
      req.user.condominiumId,
    );
    return residents.map(ResidentViewModel.toHttp);
  }

  @ApiOkResponse({ type: ResidentViewModel })
  @Get(':id')
  @UseInterceptors(ErrorInterceptor)
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.residentService.findById(id);
  }

  @ApiOkResponse({ type: ResidentViewModel })
  @Get('filter/by')
  async findByData(
    @Query()
    data: FindByDataDto,
  ) {
    return await this.residentService.findByData(data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.residentService.deleteResident(id);
  }

  @ApiOkResponse({ type: ResidentViewModel })
  @Post('update')
  async update(@Body() residentInfos: UpdateResidentDto) {
    return await this.residentService.updateResidentInfos(residentInfos);
  }
}
