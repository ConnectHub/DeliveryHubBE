import { api } from '../../../services/api';
import { Order } from '../../Orders/interfaces';
import { ConfirmOrder } from '../interfaces';
export async function confirmOrder(params: ConfirmOrder): Promise<Order> {
  return (await api.post('/order/accept', params)).data;
}

export async function getOrderByUrl(url: string | undefined): Promise<Order> {
  return (await api.get(`/order/url/${url}`)).data;
}
