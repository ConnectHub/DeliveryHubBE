import { ChartData } from '../interfaces';
import { api } from '../../../services/api';

export async function getTotalByStatus(): Promise<ChartData[]> {
  return (await api.get('order/totalByStatus')).data;
}
