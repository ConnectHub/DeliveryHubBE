import { api } from '../../../../services/api';
import { CreateOrder, Order } from '../../interfaces';

export class OrderRepository {
  static async getOrders(): Promise<Order[]> {
    return (await api.get('/order/list/recipient')).data;
  }

  static async createOrder(newOrder: CreateOrder): Promise<Order> {
    return (
      await api.post('/order/create', {
        ...newOrder,
      })
    ).data;
  }

  static async reSendNotification(id: string): Promise<void> {
    await api.post(`/order/sendNotification/${id}`);
  }
}
