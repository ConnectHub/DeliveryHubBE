import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './repository/dashboard.repository';
import { ChartDataInterface } from './interfaces';
import { FormatMonth } from '../../infra/utils/format-month';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async allDeliveredOrders(condominiumId: string): Promise<number> {
    return await this.dashboardRepository.allDeliveredOrders(condominiumId);
  }

  async totalResidents(condominiumId: string): Promise<number> {
    return await this.dashboardRepository.totalResidents(condominiumId);
  }

  async totalOrdersPending(condominiumId: string): Promise<number> {
    return await this.dashboardRepository.totalOrdersPending(condominiumId);
  }

  async listOrdersByStatus(
    condominiumId: string,
  ): Promise<ChartDataInterface[]> {
    return await this.dashboardRepository.listOrdersByStatus(condominiumId);
  }

  async totalOrdersByMonths(
    condominiumId: string,
  ): Promise<ChartDataInterface[]> {
    const ordersByMonths = await this.dashboardRepository.totalOrdersByMonths(
      condominiumId,
    );

    const monthNames = FormatMonth.monthNames;
    const monthCounts = {};

    monthNames.forEach((monthName) => {
      monthCounts[monthName] = 0;
    });

    ordersByMonths.forEach((order: ChartDataInterface) => {
      const orderDate = new Date(order.receiptDateHour).getMonth();
      const monthName = monthNames[orderDate];
      monthCounts[monthName]++;
    });

    return Object.keys(monthCounts).map((monthName) => ({
      month: monthName,
      orderCount: monthCounts[monthName],
    }));
  }

  async listOrdersByCondominium(): Promise<ChartDataInterface[]> {
    return await this.dashboardRepository.listOrdersByCondominium();
  }
}
