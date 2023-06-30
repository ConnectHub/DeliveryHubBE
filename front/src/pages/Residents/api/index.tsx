import { api } from '../../../services/api';

interface Resident {
  name: string;
  buildingApartment: string;
  phoneNumber: string;
  email: string;
}
export async function getResidents(): Promise<Resident[]> {
  return (await api('/resident/list')).data;
}
