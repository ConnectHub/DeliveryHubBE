import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './repository/dashboard.repository';
import { ChartDataInterface } from './interfaces';
import { MonthNames } from '../../infra/utils/format-month';

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
    const listOrdersByMonth = [
      {
        month: 'January',
        orderCount: 0,
      },
      {
        month: 'February',
        orderCount: 0,
      },
      {
        month: 'March',
        orderCount: 0,
      },
      {
        month: 'April',
        orderCount: 0,
      },
      {
        month: 'May',
        orderCount: 0,
      },
      {
        month: 'June',
        orderCount: 0,
      },
      {
        month: 'July',
        orderCount: 0,
      },
      {
        month: 'August',
        orderCount: 0,
      },
      {
        month: 'September',
        orderCount: 0,
      },
      {
        month: 'October',
        orderCount: 0,
      },
      {
        month: 'November',
        orderCount: 0,
      },
      {
        month: 'December',
        orderCount: 0,
      },
    ];

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

  async listOrdersByCondominium(): Promise<ChartDataInterface[]> {
    const ordersByCondominiums =
      await this.dashboardRepository.listOrdersByCondominium();

    return ordersByCondominiums.reduce((result, order) => {
      const condominiumId = order.addressee?.condominiumId;
      const condominiumName = order.addressee?.condominium?.name;

      if (condominiumId && condominiumName) {
        const foundCondominium = result.find(
          (item) => item.condominiumName === condominiumName,
        );

        if (foundCondominium) {
          foundCondominium.value += 1;
        } else {
          result.push({ condominiumName, value: 1 });
        }
      }

      return result;
    }, []);
  }
}
