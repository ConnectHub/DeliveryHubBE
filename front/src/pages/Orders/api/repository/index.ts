import { api } from '../../../../services/api';
import { CreateOrder, Order } from '../../interfaces';
export async function getOrders(): Promise<Order[]> {
  return (await api.get('/order/list/recipient')).data;
}

export async function createOrder(newOrder: CreateOrder): Promise<Order> {
  return (
    await api.post('/order/create', {
      ...newOrder,
    })
  ).data;
}

export async function reSendNotification(id: string): Promise<void> {
  await api.post(`/order/sendNotification/${id}`);
}

export function orderRepository() {
  return {
    getOrders,
    createOrder,
    reSendNotification,
  };
}