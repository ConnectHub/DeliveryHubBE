import { Injectable } from '@nestjs/common';
import { Condominium } from 'src/domain/entities/condominium';
import { CondominiumRepositoryInterface } from 'src/domain/repositories/condominium';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class CondominiumRepository implements CondominiumRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
  async create(condominium: Condominium): Promise<Condominium> {
    return await this.prisma.condominium.create({
      data: condominium,
    });
  }

  async update(condominium: Condominium): Promise<Condominium> {
    const { id, ...rest } = condominium;
    return await this.prisma.condominium.update({
      where: {
        id,
      },
      data: rest,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.condominium.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async list(): Promise<Condominium[]> {
    return await this.prisma.condominium.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findById(id: string): Promise<Condominium> {
    return await this.prisma.condominium.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findByLogin(login: string): Promise<Condominium> {
    return await this.prisma.condominium.findFirst({
      where: {
        login,
        deletedAt: null,
      },
      include: {
        rate: true,
      },
    });
  }

  async updateRate(rateId: string, id: string): Promise<void> {
    await this.prisma.condominium.update({
      where: {
        id,
      },
      data: {
        rateId,
      },
    });
  }
}
