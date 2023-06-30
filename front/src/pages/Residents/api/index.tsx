import { api } from '../../../services/api';

interface Resident {
  name: string;
}
export async function getResidents(): Promise<Resident[]> {
  return (await api('/resident/list')).data;
}
