import { Injectable } from '@nestjs/common';
import { CondominiumRepository } from './repository/condominium.repository';
import { CondominiumNotFound } from './errors/condominium-not-found';
import { Condominium } from 'src/domain/entities/condominium';

@Injectable()
export class CondominiumService {
  constructor(private readonly condominiumRepository: CondominiumRepository) {}
  async createCondominium(condominium: Condominium): Promise<Condominium> {
    return await this.condominiumRepository.create(condominium);
  }

  async findById(id: string): Promise<Condominium> {
    const condominium = await this.condominiumRepository.findById(id);
    if (!condominium) throw new CondominiumNotFound();
    return condominium;
  }

  async updateCondominium(condominium: Condominium): Promise<Condominium> {
    await this.findById(condominium.id);
    return await this.condominiumRepository.update(condominium);
  }

  async listAllCondominiums(): Promise<Condominium[]> {
    return await this.condominiumRepository.list();
  }

  async deleteCondominium(id: string): Promise<void> {
    await this.findById(id);
    await this.condominiumRepository.delete(id);
  }
}
