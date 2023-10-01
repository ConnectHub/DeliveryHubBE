import { Injectable, Logger } from '@nestjs/common';
import { CondominiumRepository } from './repository/condominium.repository';
import { CondominiumNotFound } from './errors/condominium-not-found';
import { Condominium } from 'src/domain/entities/condominium';

@Injectable()
export class CondominiumService {
  private readonly logger = new Logger(CondominiumService.name);

  constructor(private readonly condominiumRepository: CondominiumRepository) {}

  async createCondominium(condominium: Condominium): Promise<Condominium> {
    this.logger.log(`Creating condominium with name ${condominium.name}`);
    return await this.condominiumRepository.create(condominium);
  }

  async findById(id: string): Promise<Condominium> {
    const condominium = await this.condominiumRepository.findById(id);
    if (!condominium) throw new CondominiumNotFound();
    return condominium;
  }

  async updateCondominium(condominium: Condominium): Promise<Condominium> {
    this.logger.log(`Updating condominium with id ${condominium.id}`);
    await this.findById(condominium.id);
    return await this.condominiumRepository.update(condominium);
  }

  async listAllCondominiums(): Promise<Condominium[]> {
    return await this.condominiumRepository.list();
  }

  async deleteCondominium(id: string): Promise<void> {
    this.logger.log(`Deleting condominium with id ${id}`);
    await this.findById(id);
    await this.condominiumRepository.delete(id);
  }
}