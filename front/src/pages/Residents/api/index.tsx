import { api } from '../../../services/api';
import { z } from 'zod';

interface Resident {
  id: string;
  name: string;
  buildingApartment: string;
  phoneNumber: string;
  email: string;
}
export async function getResidents(): Promise<Resident[]> {
  return (await api.get('/resident/list')).data;
}

const residentSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  buildingApartment: z.string().min(3),
  phoneNumber: z.string().min(3),
  email: z.string().email(),
});
export async function createResident(resident: Resident): Promise<Resident> {
  const result = residentSchema.safeParse(resident);
  if (!result.success) throw result.error.message;
  return (await api.post('/resident/create', resident)).data;
}
