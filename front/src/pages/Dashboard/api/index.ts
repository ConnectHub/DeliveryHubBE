import { api } from '../../../services/api';

export async function getTotalByStatus(): Promise<[]> {
  return (await api.get('order/totalByStatus')).data;
}
