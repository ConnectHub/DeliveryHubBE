import { api } from '../../../services/api';
import { Order } from '../interfaces';

export async function getOrders(): Promise<Order[]> {
  return (await api.get('/order/list/recipient')).data;
}
