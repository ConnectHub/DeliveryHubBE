import { Injectable } from '@nestjs/common';
import { Condominium } from 'src/domain/entities/condominium';
import { CondominiumRepositoryInterface } from 'src/domain/repositories/condominium';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class CondominiumRepository implements CondominiumRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
  async create(condominium: Condominium): Promise<Condominium> {
    const newCondominium = await this.prisma.condominium.create({
      data: condominium,
    });
    return newCondominium;
  }
  update(condominium: Condominium): Promise<Condominium> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<Condominium> {
    throw new Error('Method not implemented.');
  }
  list(): Promise<Condominium[]> {
    throw new Error('Method not implemented.');
  }
}
