import { Injectable } from '@nestjs/common';
import { DashboardRepositoryInterface } from 'src/domain/repositories/dashboard';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ChartDataInterface } from '../interfaces';

@Injectable()
export class DashboardRepository implements DashboardRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async allDeliveredOrders(): Promise<number> {
    return await this.prisma.order.count({
      where: { status: 'DELIVERED', deletedAt: null },
    });
  }

  async totalResidents(): Promise<number> {
    return await this.prisma.resident.count({
      where: { deletedAt: null },
    });
  }

  async totalOrdersPending(): Promise<number> {
    return await this.prisma.order.count({
      where: { status: 'PENDING', deletedAt: null },
    });
  }
  async listOrdersByStatus(): Promise<ChartDataInterface[]> {
    const list = await this.prisma.order.groupBy({
      by: ['status'],
      where: { deletedAt: null },
      _count: true,
    });
    return list.map((item) => ({
      status: item.status,
      orderCount: item._count || 0,
    }));
  }

  async totalOrdersByMonths(): Promise<ChartDataInterface[]> {
    return await this.prisma.order.findMany({
      select: {
        receiptDateHour: true,
      },
    });
  }
}
