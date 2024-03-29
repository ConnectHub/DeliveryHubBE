import { Injectable } from '@nestjs/common';
import { DashboardRepositoryInterface } from '@/domain/repositories/dashboard';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { ChartDataInterface } from '../interfaces';

@Injectable()
export class DashboardRepository implements DashboardRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async allDeliveredOrders(condominiumId: string): Promise<number> {
    return await this.prisma.order.count({
      where: {
        status: 'DELIVERED',
        deletedAt: null,
        addressee: {
          condominiumId,
        },
      },
    });
  }

  async totalResidents(condominiumId: string): Promise<number> {
    return await this.prisma.resident.count({
      where: {
        deletedAt: null,
        condominiumId,
      },
    });
  }

  async totalOrdersPending(condominiumId: string): Promise<number> {
    return await this.prisma.order.count({
      where: {
        status: 'PENDING',
        deletedAt: null,
        addressee: { condominiumId },
      },
    });
  }

  async listOrdersByStatus(
    condominiumId: string,
  ): Promise<ChartDataInterface[]> {
    const list = await this.prisma.order.groupBy({
      by: ['status'],
      where: { deletedAt: null, addressee: { condominiumId } },
      _count: true,
    });
    return list.map((item) => ({
      status: item.status,
      orderCount: item._count || 0,
    }));
  }

  async totalOrdersByMonths(
    condominiumId: string,
  ): Promise<ChartDataInterface[]> {
    return await this.prisma.order.findMany({
      select: {
        receiptDateHour: true,
      },
      where: { addressee: { condominiumId } },
      orderBy: { receiptDateHour: 'asc' },
    });
  }

  async listOrdersByCondominium(): Promise<ChartDataInterface[]> {
    const list = await this.prisma.order.groupBy({
      by: ['condominiumId'],
      where: { deletedAt: null },
      _count: true,
    });
    return list.map((item) => ({
      condominiumId: item.condominiumId,
      orderCount: item._count || 0,
    }));
  }
}
