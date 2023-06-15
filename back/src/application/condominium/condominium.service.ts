import { Injectable } from '@nestjs/common';
import { CondominiumRepository } from './repository/condominium.repository';
import { Condominium } from 'src/domain/entities/condominium';

@Injectable()
export class CondominiumService {
  constructor(private readonly condominiumRepository: CondominiumRepository) {}
  async createCondominium(condominium: Condominium) {
    const newCondominium = await this.condominiumRepository.create(condominium);
    return newCondominium;
  }
}
