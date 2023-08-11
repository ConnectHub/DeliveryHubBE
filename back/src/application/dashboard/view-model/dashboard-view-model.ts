import { translateStatus } from 'src/application/order/translator/order.translator';
import { ChartDataInterface } from '../interfaces';

export class DashboardViewModel {
  static toHttp(data: ChartDataInterface) {
    return {
      status: translateStatus[data.status].toUpperCase(),
      month: data.month,
      orderCount: data.orderCount,
      value: data.value,
    };
  }
}
