import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { Order } from 'src/domain/entities/order';
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
    return order;
  }

  async findByRecipient(status: Status): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        status,
      },
    });
    return orders;
  }

  async create(order: Order): Promise<Order> {
    const { status, ...rest } = order;
    const newOrder = await this.prisma.order.create({
      data: {
        status: status,
        ...rest,
      },
    });
    return newOrder;
  }

  async updateStatus(id: string, status: Status): Promise<Order> {
    const order = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    return order;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({
      where: {
        id,
      },
    });
  }
}
