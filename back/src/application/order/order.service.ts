import { Injectable } from '@nestjs/common';
import { Order } from 'src/domain/entities/order';
import { OrderRepository } from './repository/order.repository';
import { Status } from '@prisma/client';
import { OrderNotFound } from './errors/order-not-found';
import { RandomStringGenerator } from './helpers/generate-random-string';
import { OrderAlreadyBeenDelivered } from './errors/order-already-been-delivered';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new OrderNotFound();
    return order;
  }

  async createOrder(order: Order): Promise<Order> {
    order.code = new RandomStringGenerator().generate(6);
    return await this.orderRepository.create(order);
  }

  async deleteOrder(id: string): Promise<void> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new OrderNotFound();
    await this.orderRepository.delete(id);
  }

  async acceptOrder(code: string, url: string): Promise<Order> {
    const order = await this.orderRepository.findByUrl(url);
    if (!order) throw new OrderNotFound();
    if (order.status === Status.DELIVERED)
      throw new OrderAlreadyBeenDelivered();
    if (order.code !== code) throw new OrderNotFound();
    return await this.orderRepository.updateStatus(url);
  }

  async findOrders(): Promise<Order[]> {
    return await this.orderRepository.findOrders();
  }

  async findByUrl(url: string): Promise<Order> {
    const order = await this.orderRepository.findByUrl(url);
    if (!order) throw new OrderNotFound();
    return order;
  }
}
