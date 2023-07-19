import { Injectable } from '@nestjs/common';
import { CondominiumRepository } from './repository/condominium.repository';
import { CondominiumNotFound } from './errors/condominium-not-found';
import { Condominium } from 'src/domain/entities/condominium';
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class CondominiumService {
  constructor(private readonly condominiumRepository: CondominiumRepository) {}

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await genSalt(saltOrRounds);
    return await hash(password, salt);
  }
  async createCondominium(condominium: Condominium): Promise<Condominium> {
    condominium.password = await this.hashPassword(condominium.password);
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

  async findCondominiumByLogin(login: string): Promise<Condominium> {
    return await this.condominiumRepository.findByLogin(login);
  }
}
