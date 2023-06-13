import { Injectable } from '@nestjs/common';
import { Order, Status } from 'src/domain/entities/order';
import { OrderRepository } from './repository/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findOrderById(id: string): Promise<Order> {
    return await this.orderRepository.findById(id);
  }

  async createOrder(order: Order): Promise<Order> {
    return await this.orderRepository.create(order);
  }

  async deleteOrder(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async updateOrderStatus(orderId: string, status: Status): Promise<Order> {
    return await this.orderRepository.updateStatus(orderId, status);
  }
}
