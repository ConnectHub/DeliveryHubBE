import { translateStatus } from 'src/application/order/translator/order.translator';
import { ChartDataInterface } from '../interfaces';
import { translateMonth } from '../translator/month.translator';

export class DashboardViewModel {
  static toHttp(data: ChartDataInterface) {
    return {
      status: translateStatus[data.status]?.toUpperCase(),
      month: translateMonth[data.month]?.toUpperCase(),
      orderCount: data.orderCount,
    };
  }
}
