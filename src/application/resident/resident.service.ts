import { Injectable, Logger } from '@nestjs/common';
import { ResidentRepository } from './repository/resident.repository';
import { Resident, resident } from '@/domain/entities/resident';
import { ResidentAlreadyExist } from './errors/resident-already-exists';
import { FormatPhoneNumber } from '@/infra/utils/format-phone-number';
import { ResidentErrors } from './errors/resident-error';

@Injectable()
export class ResidentService {
  private readonly logger = new Logger(ResidentService.name);

  constructor(
    private readonly residentRepository: ResidentRepository,
    private readonly residentErrors: ResidentErrors,
  ) {}

  async createResident(resident: Resident): Promise<Resident> {
    this.logger.log(`Creating resident with name ${resident.name}`);
    await this.findResident(resident);
    resident.phoneNumber = this.formatPhoneNumber(resident.phoneNumber);
    return await this.residentRepository.create(resident);
  }

  async findResident(resident: Resident): Promise<Resident> {
    const prevResident = await this.residentRepository.findResident(resident);
    if (prevResident) throw new ResidentAlreadyExist();
    return prevResident;
  }

  async listAllResidents(condominiumId: string): Promise<Resident[]> {
    return await this.residentRepository.list(condominiumId);
  }

  async deleteResident(id: string): Promise<void> {
    this.logger.log(`Deleting resident with id ${id}`);
    await this.findById(id);
    await this.residentRepository.delete(id);
  }

  async findById(id: string): Promise<resident> {
    return this.residentErrors.verifyResidentExistence(
      await this.residentRepository.findById(id),
    );
  }

  async updateResidentInfos(residentInfos: Resident): Promise<Resident> {
    this.logger.log(`Updating resident with id ${residentInfos.id}`);
    const { id } = residentInfos;
    await this.findById(id);
    if (residentInfos.phoneNumber)
      residentInfos.phoneNumber = this.formatPhoneNumber(
        residentInfos.phoneNumber,
      );
    return await this.residentRepository.update(residentInfos);
  }

  async findByData(data: Resident): Promise<Resident> {
    if (data.phoneNumber)
      data.phoneNumber = this.formatPhoneNumber(data.phoneNumber);
    return await this.residentRepository.findByInfos(data);
  }

  private formatPhoneNumber(phoneNumber: string): string {
    return FormatPhoneNumber.format(phoneNumber);
  }
}
