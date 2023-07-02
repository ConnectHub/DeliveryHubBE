import { api } from '../../../services/api/api';
import { Resident } from '../interfaces';

export async function getResidents(): Promise<Resident[]> {
  return (await api.get('/resident/list')).data;
}

export async function createResident(resident: Resident): Promise<Resident> {
  return (
    await api.post('/resident/create', {
      ...resident,
      condominiumId: '511c3cff-49ca-40f6-ac5d-335a2ce81cff',
    })
  ).data;
}

export async function deleteResident(id: string): Promise<void> {
  await api.delete(`/resident/${id}`);
}

export async function updateResident(resident: Resident): Promise<Resident> {
  return (await api.post('/resident/update', resident)).data;
}
