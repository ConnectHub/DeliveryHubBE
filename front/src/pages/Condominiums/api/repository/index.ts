import { api } from '../../../../services/api';
import { Condominium, CreateCondominium } from '../../interfaces';

export class CondominiumRepository {
  static async getCondominiums(): Promise<Condominium[]> {
    return (await api.get('/condominium/list')).data;
  }

  static async createCondominium(
    newCondominium: CreateCondominium,
  ): Promise<Condominium> {
    return (
      await api.post('/condominium/create', {
        ...newCondominium,
      })
    ).data;
  }

  static async deleteCondominium(id: string): Promise<void> {
    await api.delete(`/condominium/${id}`);
  }

  static async updateCondominium(
    condominium: Condominium,
  ): Promise<Condominium> {
    return (await api.post('/condominium/update', condominium)).data;
  }
}
