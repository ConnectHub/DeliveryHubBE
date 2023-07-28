import { api } from '../../../../services/api';
import { Resident } from '../../interfaces';

export class ResidentRepository {
  static async getResidents(): Promise<Resident[]> {
    return (await api.get('/resident/list')).data;
  }

  static async createResident(resident: Resident): Promise<Resident> {
    return (
      await api.post('/resident/create', {
        ...resident,
      })
    ).data;
  }

  static async deleteResident(id: string): Promise<void> {
    await api.delete(`/resident/${id}`);
  }

  static async updateResident(resident: Resident): Promise<Resident> {
    return (await api.post('/resident/update', resident)).data;
  }
}
