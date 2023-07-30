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
  static aggregateOrdersByMonth(orders: ChartDataInterface[]) {
    const monthNames = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    const ordersByMonthMap: Record<string, number> = {};
    monthNames.forEach((month) => {
      ordersByMonthMap[month] = 0;
    });

    orders.forEach((order) => {
      const orderDate = new Date(order.receiptDateHour);
      const orderMonth = monthNames[orderDate.getMonth()];
      ordersByMonthMap[orderMonth] += 1;
    });

    const ordersGroupedByMonth: ChartDataInterface[] = [];

    Object.entries(ordersByMonthMap).forEach(([month, count]) => {
      ordersGroupedByMonth.push({ month, orderCount: count });
    });

    return ordersGroupedByMonth;
  }

  static aggregateOrdersByCondominium(orders) {
    const deliveriesByCondominium = orders.reduce((result, order) => {
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
    }, [] as { condominiumName: string; value: number }[]);

    return deliveriesByCondominium;
  }
}
