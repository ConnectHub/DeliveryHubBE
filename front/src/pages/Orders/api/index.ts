import { api } from '../../../services/api/api';

interface Order {
  id: string;
  phoneNumber: string;
  status: string;
  code: string;
  url: string;
  name: string;
  createdAt: string;
}

export async function getOrders(): Promise<Order[]> {
  return (await api.get('/order/list/recipient')).data;
}
