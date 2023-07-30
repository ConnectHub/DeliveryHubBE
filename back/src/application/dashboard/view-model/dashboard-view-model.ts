import { ChartDataInterface } from '../interfaces';

export class DashboardViewModel {
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
}
