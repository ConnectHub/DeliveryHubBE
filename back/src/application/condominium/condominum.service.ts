import { Injectable } from '@nestjs/common';
import { CondominiumRepository } from './repository/condominium.repository';
import { Condominium } from 'src/domain/entities/condominium';
import { CondominiumNotFound } from './errors/condominium-not-found';

@Injectable()
export class CondominiumService {
  constructor(private readonly condominiumRepository: CondominiumRepository) {}
  async createCondominium(condominium: Condominium): Promise<Condominium> {
    const newCondominium = await this.condominiumRepository.create(condominium);
    return newCondominium;
  }

  async findById(id: string): Promise<Condominium> {
    const condominium = await this.condominiumRepository.findById(id);
    if (!condominium) throw new CondominiumNotFound();
    return condominium;
  }

  async updateCondominium(condominium: Condominium): Promise<Condominium> {
    const { id } = condominium;
    await this.findById(id);
    return await this.condominiumRepository.update(condominium);
  }
}
