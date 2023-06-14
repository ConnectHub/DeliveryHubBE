import { Injectable } from '@nestjs/common';
import { Resident } from 'src/domain/entities/resident';
import { ResidentRepositoryInterface } from 'src/domain/repositories/resident';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class ResidentRepository implements ResidentRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(resident: Resident): Promise<Resident> {
    const newResident = await this.prisma.resident.create({
      data: resident,
    });
    return newResident;
  }

  async list(): Promise<Resident[]> {
    return await this.prisma.resident.findMany();
  }

  async delete(id: string): Promise<void> {
    await this.prisma.resident.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id,
      },
    });
  }

  async findResident(resident: Resident): Promise<Resident> {
    const { phoneNumber, ...rest } = resident;
    return await this.prisma.resident.findFirst({
      where: rest,
    });
  }

  update(id: string, resident: Resident): Promise<Resident> {
    return this.prisma.resident.update({
      where: {
        id,
      },
      data: resident,
    });
  }

  async findById(id: string): Promise<Resident> {
    return await this.prisma.resident.findUnique({
      where: {
        id,
      },
    });
  }

  findByPhoneNumber(phoneNumber: string): Promise<Resident> {
    throw new Error('Method not implemented.');
  }
  findByName(name: string): Promise<Resident> {
    throw new Error('Method not implemented.');
  }
  findByBuildingApartment(name: string): Promise<Resident> {
    throw new Error('Method not implemented.');
  }
}
