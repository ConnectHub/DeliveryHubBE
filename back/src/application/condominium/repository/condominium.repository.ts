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

  delete(id: string): Promise<Condominium> {
    throw new Error('Method not implemented.');
  }

  list(): Promise<Condominium[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Condominium> {
    return await this.prisma.condominium.findUnique({
      where: {
        id,
      },
    });
  }

  async listAllCondominium(): Promise<Condominium[]> {
    return await this.prisma.condominium.findMany({
      where: {
        deletedAt: null,
      },
    });
  }
}
