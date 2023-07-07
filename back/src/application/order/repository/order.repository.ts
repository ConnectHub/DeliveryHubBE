import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { Order } from 'src/domain/entities/order';
import { OrderRepositoryInterface } from 'src/domain/repositories/order';
import { PrismaService } from '../../../infra/prisma/prisma.service';

@Injectable()
export class OrderRepository implements OrderRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Order> {
    return await this.prisma.order.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        addressee: true,
      },
    });
  }

  async getTotalByStatus(id: string): Promise<any> {
    return await this.prisma.order.groupBy({
      by: ['status'],
      _count: true,
      where: {
        id,
      },
    });
  }

  async findByUrl(url: string): Promise<Order> {
    return await this.prisma.order.findFirst({
      where: {
        url,
        deletedAt: null,
      },
    });
  }

  async findByRecipient(status: Status): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: {
        status,
        deletedAt: null,
      },
    });
  }

  async create(order: Order): Promise<Order> {
    const { addressee, ...rest } = order;
    return await this.prisma.order.create({
      data: {
        ...rest,
      },
      include: {
        addressee: true,
      },
    });
  }

  async updateStatus(url: string, sign: string): Promise<Order> {
    return await this.prisma.order.update({
      where: {
        url,
      },
      data: {
        status: Status.DELIVERED,
        sign,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findOrders(condominiumId: string): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: {
        deletedAt: null,
        addressee: {
          condominiumId,
        },
      },
      include: {
        addressee: true,
      },
    });
  }
}
