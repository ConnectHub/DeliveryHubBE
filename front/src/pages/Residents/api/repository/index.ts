import { api } from '../../../../services/api';
import { Resident } from '../../interfaces';

async function getResidents(): Promise<Resident[]> {
  return (await api.get('/resident/list')).data;
}

async function createResident(resident: Resident): Promise<Resident> {
  return (
    await api.post('/resident/create', {
      ...resident,
    })
  ).data;
}
async function deleteResident(id: string): Promise<void> {
  await api.delete(`/resident/${id}`);
}

async function updateResident(resident: Resident): Promise<Resident> {
  return (await api.post('/resident/update', resident)).data;
}

export function residentRepository() {
  return {
    getResidents,
    createResident,
    deleteResident,
    updateResident,
  };
}
