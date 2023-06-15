import { Injectable } from '@nestjs/common';
import { ResidentRepository } from './repository/resident.repository';
import { Resident } from 'src/domain/entities/resident';
import { NumberFormat } from './helpers/number-format';
import { ResidentNotFound } from './errors/resident-not-found';
import { ResidentAlreadyExist } from './errors/resident-already-exists';

@Injectable()
export class ResidentService {
  constructor(private residentRepository: ResidentRepository) {}

  async createResident(resident: Resident): Promise<Resident> {
    await this.findResident(resident);
    resident.phoneNumber = this.formatPhoneNumber(resident.phoneNumber);
    return await this.residentRepository.create(resident);
  }

  async findResident(resident: Resident): Promise<Resident> {
    const prevResident = await this.residentRepository.findResident(resident);
    if (prevResident) throw new ResidentAlreadyExist();
    return prevResident;
  }

  async listAllResidents(): Promise<Resident[]> {
    return await this.residentRepository.list();
  }

  async deleteResident(id: string): Promise<void> {
    await this.findById(id);
    await this.residentRepository.delete(id);
  }

  async findById(id: string): Promise<Resident> {
    const resident = await this.residentRepository.findById(id);
    if (!resident) throw new ResidentNotFound();
    return resident;
  }

  async updateResidentInfos(residentInfos: Resident): Promise<Resident> {
    const { id, ...rest } = residentInfos;
    await this.findById(id);

    if (rest.phoneNumber)
      rest.phoneNumber = this.formatPhoneNumber(rest.phoneNumber);
    return await this.residentRepository.update(residentInfos);
  }

  async findByPhoneNumber(residentPhone: string): Promise<Resident> {
    residentPhone = this.formatPhoneNumber(residentPhone);
    const prevResident = await this.residentRepository.findByPhoneNumber(residentPhone);
    if(!prevResident)throw new ResidentNotFound() 
    return prevResident;
  }

  private formatPhoneNumber(phoneNumber: string): string {
    return NumberFormat.format(phoneNumber);
  }
}
