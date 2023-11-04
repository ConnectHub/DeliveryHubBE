import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './repository/dashboard.repository';
import { ChartDataInterface } from './interfaces';
import { MonthNames } from '../../infra/utils/format-month';
import { CondominiumRepository } from '../condominium/repository/condominium.repository';
import { listOrdersByMonth } from './utils/list-of-order-by-month';

@Injectable()
export class DashboardService {
  constructor(
    private readonly dashboardRepository: DashboardRepository,
    private readonly condominiumRepository: CondominiumRepository,
  ) {}

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

    ordersByMonths.forEach((order) => {
      const orderDate = new Date(order.receiptDateHour).getMonth();
      order.month = MonthNames.format(orderDate);

      listOrdersByMonth.map((item) => {
        if (item.month === order.month) {
          item.orderCount++;
        }
      });
    });

    return listOrdersByMonth;
  }

  async listOrdersByCondominium(): Promise<any> {
    const ordersByCondominiums =
      await this.dashboardRepository.listOrdersByCondominium();

    await Promise.all(
      ordersByCondominiums.map(async (order) => {
        const condominium = await this.condominiumRepository.findById(
          order.condominiumId,
        );
        order.condominiumName = condominium.name;
        delete order.condominiumId;
        return order;
      }),
    );

    return ordersByCondominiums;
  }
}
