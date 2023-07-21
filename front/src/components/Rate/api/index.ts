import { api } from '../../../services/api';

export async function createRate(rate: number): Promise<void> {
  await api.post('/rate', {
    value: rate,
  });
}
