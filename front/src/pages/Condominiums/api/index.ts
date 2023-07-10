import { api } from '../../../services/api';
import { Condominium } from '../interfaces';

export async function getCondominiums(): Promise<Condominium[]> {
  return (await api.get('/condominium/list')).data;
}

export async function createCondominium(
  newCondominium: Condominium,
): Promise<Condominium> {
  return (
    await api.post('/condominium/create', {
      ...newCondominium,
    })
  ).data;
}

export async function deleteCondominium(id: string): Promise<void> {
  await api.delete(`/condominium/${id}`);
}

export async function updateCondominium(
  resident: Condominium,
): Promise<Condominium> {
  return (await api.post('/condominium/update', resident)).data;
}
