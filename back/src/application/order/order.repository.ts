import { Injectable } from '@nestjs/common';
import { Order, Status } from 'src/domain/entities/order';
import { OrderRepositoryInterface } from 'src/domain/repositories/order';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class OrderRepository implements OrderRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });
    return order as Order;
  }
  findByRecipient(recipient: string): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
  async create(order: Order): Promise<Order> {
    const { status, ...rest } = order;
    const newOrder = await this.prisma.order.create({
      data: {
        ...rest,
        status: status,
      },
    });
    return newOrder as Order;
  }
  update(status: Status): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
